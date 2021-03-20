let router = require("express").Router();
    
router.post("/", async (req, res) => {    
    let sql = "select * from users where username = $1";
    let values = ["edwardgyampo"];
    let result;

    try {
        result = await req.app.get("dbConn").query(sql, values);
        console.table(result.rows);
        res.send(result.rows);
    }
    catch (error) {
        let message = error.message + `: Error while executing query \n\t"${sql}"`;
        console.log(message);
        let json = { Error: "Failed to fetch users." };
        res.send(json);
    }
});

module.exports = router;