const router = require("express").Router();

router.get("/", async (req, res) => {
    res.sendFile(path.join(req.app.get("rootDir"), "www", "index.html"));
});

module.exports = router;