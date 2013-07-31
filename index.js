var package = require("./package");
var colors = require('colors');
var express = require('express');
var grunt = require("grunt");
var app = express();
var io = require("socket.io");
var http = require("http");

var Moniker = require('moniker');

require("./Gruntfile")(grunt);

var count = 0;

app.configure("development", function () {
    grunt.tasks(["default"], {}, function () {
	// nothing to do here, the compilation finished
    });
});

app.configure("production", function () {
    grunt.tasks(["production"], {}, function () {
	// nothing to do here, the compilation finished
    });
});

app.engine('jade', require('jade').__express);
app.set('views', __dirname + '/views');
app.use(express.logger());
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.cookieSession({
    secret: "a very long and RANDOM secret: 42" 
}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("index.jade", {
	random : Moniker.choose()
    });
});

var server = http.createServer(app);
io = io.listen(server);

io.sockets.on('connection', function (socket) {
    count++;
    io.sockets.emit('message', { count: count });

    console.log("new client..".green, "feels good to be loved!".yellow);
    socket.on("chat", function (message) {
	socket.broadcast.emit("chat", message);
    });

    socket.on('disconnect', function () {
	count--;
	io.sockets.emit('message', { count: count });
    });

});

var port = process.env.PORT || 5000;

server.listen(port, function (err) {
    if (err) {
	console.log(err);
	process.exit(1);
    }

    var output = "";
    output += package.name.red;
    output += "@";
    output += package.version.yellow;
    output += " started up on port 5000".green;

    console.log(output);
});
