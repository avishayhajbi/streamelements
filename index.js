require('./utils/mongo');
require('./utils/redis');
var port = 3000;
var numCPUs = require('os').cpus().length;
var cluster = require('cluster');
if (cluster.isMaster) {
    console.log("Master " + process.pid + " is running");
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', function (worker, code, signal) {
        console.log("worker " + worker.process.pid + " died");
    });
}
else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    var app = require('./app')["default"];
    app.listen(port, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("server is listening on " + port);
    });
    console.log("Worker " + process.pid + " started");
}
