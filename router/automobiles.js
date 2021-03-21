let router = require("express").Router();

router.post("/read/for-manufacturer", async (req, res) => {
    let sql = `
        SELECT
            automobiles.name, automobiles.id
        FROM
            automobiles
        JOIN
            manufacturers
        ON
            automobiles.manufacturer_id = manufacturers.id
        WHERE
            manufacturers.id = $1;
        `;

    let values = [req.body.manufacturerId];
    
    try {
        let result;
        result = await req.app.get("dbConn").query(sql, values);
        res.send(result.rows);
    }
    catch (error) {
        let message = error.message + `: Error while executing query \n\t"${sql}"`;
        console.log(message);
        let json = { Error: "Failed to fetch automobiles for manufacturer." };
        res.send(json);
    }
});

module.exports = router;