const express = require("express");
const path = require("path");
const app = express();

app.set("port", process.env.PORT || 8080);
app.set("rootDir", __dirname);

app.use(express.json());
app.use("/", express.static(path.join(app.get("rootDir"), "www/")));
app.get("/**/", require(path.join(app.get("rootDir"), "router", "index.js")));

app.listen(app.get("port"), () => {
    console.log(`Server running on port ${app.get("port")}`);
});