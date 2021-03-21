const favicon = require('serve-favicon');
const express = require("express");
const path = require("path");
const app = express();
const pg = require("pg");

// DEBUGGING PURPOSE: Toggles resetting database to new and empty on app launch
// and then populates it with sample data stored in .sql files.
const isResetDB = false;

// All options specific to app are set here.
app.set("port", 8080);
app.set("rootDir", __dirname);
app.set("dbConfig", {
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "autoaudit"
});

// Make the pre-included postgres database active for performing before-launch operations.
// Allows dynamic creation of app database and all tables.
if (isResetDB) {
    let initialConfig = Object.assign({}, app.get("dbConfig"), { database: "postgres" });
    app.set("dbConn", new pg.Pool(initialConfig));
}
else {
    app.set("dbConn", new pg.Pool(app.get("dbConfig")));
}

(async () => {
    if (isResetDB && await databaseExists()) {
        console.log("present sir!");
        await app.get("dbConn").query(`DROP DATABASE ${app.get("dbConfig").database} WITH (FORCE);`);
    }

    try {
        await app.get("dbConn").connect();
        console.log(`Database client connected!`);
        
        if (await databaseExists(app.get("dbConfig").database)) {

        }
        else {
            let config = app.get("dbConfig");
            let { database } = config;
            await createDatabase(database);
            app.set("dbConn", new pg.Pool(config));
            await createTables();
            await insertRows();
        }

        app.use(express.json());
        app.use(favicon(path.join(app.get("rootDir"), 'favicon.ico')));
        app.use("/", express.static(path.join(app.get("rootDir"), "www/")));
        app.use("/pages", express.static(path.join(app.get("rootDir"), "www/pages/")));
        app.use("/components", express.static(path.join(app.get("rootDir"), "www/components/")));
        app.use("/helpers", express.static(path.join(app.get("rootDir"), "www/helpers/")));
        app.use("/classes", express.static(path.join(app.get("rootDir"), "www/classes/")));
        app.get("/**/", require(path.join(app.get("rootDir"), "router", "index.js")));

        // All router urls are added inside the url array
        // Routers are contained in "router/" (top-level, no nesting)
        let urls = ["manufacturers", "automobiles"];
        urls.forEach(router => {
            let file = path.join(app.get("rootDir"), "router", `${router}.js`);
            let fn = require(file);
            let url = `/${router}`;
            app.use(url, fn);
        });

        app.listen(app.get("port"), () => {
            console.log(`Server running on port ${app.get("port")}`);
        });
    }
    catch (error) {
        console.log(error);
    }
})();

async function databaseExists() {
    let result = await app.get("dbConn").query("SELECT * FROM pg_database WHERE datname = $1", [app.get("dbConfig").database]);
    return result.rows.length != 0;
}

async function createDatabase(database) {
    let result = await app.get("dbConn").query("CREATE DATABASE " + database);
    console.log(`New database (${database}) created for app first-launch!`);
    return result;
}

async function createTables() {
    let fs = require("fs").promises;
    let sql = String(await fs.readFile(path.join(app.get("rootDir"), "sql", "create_tables.sql")));
    try {
        let result = await app.get("dbConn").query(sql);
        console.log("Tables created for app first-launch!");
        return result;
    }
    catch (error) {
        console.log(error);
    }
}

async function insertRows() {
    let fs = require("fs").promises;
    let sqls = [
        String(await fs.readFile(path.join(app.get("rootDir"), "sql", "insert_manufacturers.sql"))),
        String(await fs.readFile(path.join(app.get("rootDir"), "sql", "insert_automobiles.sql")))
    ];

    let fn = (sql) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await app.get("dbConn").query(sql);
                console.log("Row samples inserted into table for app test-launch!");
                resolve(result);
            }
            catch (error) {
                reject(error);
            }
        });
    };

    // Run the different sql queries as tasks in series
    let completeTasks = null;
    sqls.forEach((sql) => {
        if (completeTasks) {
            completeTasks.then(fn(sql));
            return;
        }
        completeTasks = fn(sql);
    });
}