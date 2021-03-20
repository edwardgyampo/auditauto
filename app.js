const favicon = require('serve-favicon');
const express = require("express");
const path = require("path");
const app = express();
const pg = require("pg");

// DEBUGGING PURPOSE: Resets database to new and empty on app launch.
const isResetDB = true;

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
let initialConfig = Object.assign({}, app.get("dbConfig"), { database: "postgres" });

app.set("dbConn", new pg.Pool(initialConfig));

(async () => {
    if (isResetDB && await databaseExists()) {
        await app.get("dbConn").query(`DROP DATABASE ${app.get("dbConfig").database} WITH (FORCE);`);
    }

    try {
        await app.get("dbConn").connect();
        console.log(`Database client connected!`);

        if (!await databaseExists()) {
            await createDatabase();
            app.set("dbConn", new pg.Pool(app.get("dbConfig")));
            await createTables();
        }

        app.use(express.json());
        app.use(favicon(path.join(app.get("rootDir"), 'favicon.ico')));
        app.use("/", express.static(path.join(app.get("rootDir"), "www/")));
        app.use("/views/", express.static(path.join(app.get("rootDir"), "www/views")));
        app.get("/**/", require(path.join(app.get("rootDir"), "router", "index.js")));

        // All router urls are added inside the url array
        // Routers are contained in "router/" (top-level, no nesting)
        let urls = ["users"];
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

async function createDatabase() {
    let { database } = app.get("dbConfig");
    let result = await app.get("dbConn").query("CREATE DATABASE " + database);
    console.log(`New database (${database}) created for app first-launch!`);
    return result;
}

async function createTables() {
    let fs = require("fs").promises;
    let sql = String(await fs.readFile(path.join(app.get("rootDir"), "sql", "tables.sql")));
    try {
        let result = await app.get("dbConn").query(sql);
        console.log("Tables created for app first-launch!");
        return result;
    }
    catch (error) {
        console.log(error);
    }
}