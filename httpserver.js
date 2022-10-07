//express JS
var express = require("express");
var app = express();
app.listen(7070, startup);
function startup() {
    console.log("Server started at port 7070");
}
app.use(express.static(__dirname));

//Socket IO
var http = require("http");
var server = http.createServer();
server.listen(9090);
var socketio = require("socket.io");
// var io = socketio(server);
var io = new socketio.Server(server, { cors: { origin: '*' } });

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");


});

io.on("connect", function (client) {
    console.log("New Client is Connected");

    client.on("registername", function (data) {
        var s = JSON.parse(data).nameofuser;
        var msg = s + " Connected";
        console.log(msg);

        // client.emit("printname", JSON.stringify({ message: msg}));
        //send "printname" event to only current client

        io.sockets.emit("printname", JSON.stringify({ message: msg }));
        //send "printname" event to all connected clients
    });

    client.on("clientmessage", function(data) {
        console.log("client message received");
        var d2 = JSON.parse(data);
        var s = d2.messagetoprint;
        io.sockets.emit("printname", JSON.stringify({ message: s }));
    });
});