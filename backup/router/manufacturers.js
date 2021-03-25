let router = require("express").Router();

router.post("/read", async (req, res) => {
    let sql = "SELECT * FROM manufacturers";

    try {
        let result;
        result = await req.app.get("dbConn").query(sql);
        res.send(result.rows);
    }
    catch (error) {
        let message = error.message + `: Error while executing query \n\t"${sql}"`;
        console.log(message);
        let json = { Error: "Failed to fetch manufacturers." };
        res.send(json);
    }
});

router.post("/create", async (req, res) => {
    let values = [ req.body.name ];
    
    let sql = 
        `
            INSERT INTO
                manufacturers ("name")
            VALUES
                ($1)
            ;
        `;

    try {
        let result;
        result = await req.app.get("dbConn").query(sql, values);
        res.send(result);
    }
    catch (error) {
        let message = error.message + `: Error while executing query \n\t"${sql}"`;
        console.log(message);
        let json = { Error: "Failed to add manufacturer." };
        res.send(json);
    }
});

router.post("/delete", async (req, res) => {
    let values = [ req.body.id ];
    
    let sql = 
        `
            DELETE FROM
                manufacturers
            WHERE
                id = $1;
        `;

    try {
        let result;
        result = await req.app.get("dbConn").query(sql, values);
        res.send(result);
    }
    catch (error) {
        let message = error.message + `: Error while executing query \n\t"${sql}"`;
        console.log(message);
        let json = { Error: "Failed to delete manufacturer." };
        res.send(json);
    }
});

module.exports = router;