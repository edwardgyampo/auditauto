const dotenv = require('dotenv').config();
const favicon = require('serve-favicon');
const express = require("express");
const path = require("path");
const app = express();
const pg = require("pg");

if (dotenv.error) throw dotenv.error;

// All options specific to app are set here.
app.set("isRecreateDB", false);
app.set("isRecreateTables", true);
app.set("port", process.env.PORT || 8080);
app.set("rootDir", __dirname);
app.set("dbConfig", {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

// Make the pre-included postgres database active for performing before-launch operations.
// Allows dynamic creation of app database and all tables.
if (process.env.MODE == "development" && app.get("isRecreateDB")) {
    let initialConfig = Object.assign({}, app.get("dbConfig"), { database: "postgres" });
    app.set("dbConn", new pg.Pool(initialConfig));
}
else if (process.env.MODE == "development") {
    app.set("dbConn", new pg.Pool(app.get("dbConfig")));
}
else {
    app.set("dbConn", new pg.Client(process.env.DB_URL));
}

(async () => {
    if (app.get("isRecreateDB") && await localDatabaseExists() && process.env.MODE == "development") {
        let name = app.get("dbConfig").database;
        let sql = `DROP DATABASE ${name} WITH (FORCE);`;
        await app.get("dbConn").query(sql);
    }

    try {
        await app.get("dbConn").connect();
        console.log(`Database client connected!`);

        let recreateDBTests = [
            app.get("isRecreateDB"),
            process.env.MODE == "development",
            !await localDatabaseExists()
        ];

        if (!recreateDBTests.includes(false)) {
            let config = app.get("dbConfig");
            let { database } = config;
            await recreateDatabase(database);
            app.set("dbConn", new pg.Pool(config));
        }

        let isRecreateTables = isReinsertRows =
            (await localDatabaseExists() || process.env.MODE == "development")
            &&
            app.get("isRecreateTables");

        isRecreateTables && await recreateTables();
        isReinsertRows && await reinsertRows();

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

async function localDatabaseExists() {
    let conn = new pg.Pool(app.get("dbConfig"));
    let sql = "SELECT * FROM pg_database WHERE datname = $1;";
    let values = [app.get("dbConfig").database];
    let result = await conn.query(sql, values);
    let length = result.rows.length;
    return length != 0;
}

async function recreateDatabase(database) {
    let conn = await app.get("dbConn");
    let result = conn.query("CREATE DATABASE " + database);
    console.log(`Database (${database}) created for first-launch!`);
    return result;
}

async function recreateTables() {
    let fs = require("fs").promises;
    let file = path.join(app.get("rootDir"), "sql", "recreate_tables.sql");
    let sql = String(await fs.readFile(file));
    try {
        let result = await app.get("dbConn").query(sql);
        console.log("Tables created for app first-launch!");
        return result;
    }
    catch (error) { console.log(error); }
}

async function reinsertRows() {
    let fs = require("fs").promises;
    let sqls = [
        String(await fs.readFile(path.join(app.get("rootDir"), "sql", "reinsert_manufacturers.sql"))),
        String(await fs.readFile(path.join(app.get("rootDir"), "sql", "reinsert_automobiles.sql")))
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