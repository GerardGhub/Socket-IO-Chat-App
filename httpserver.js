var express = require("express");
var app = express();
app.listen(7070, startup);
function startup() {
    console.log("Server started at port 7070");
}