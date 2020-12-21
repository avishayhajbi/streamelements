require('./utils/mongo');
require('./utils/redis');
const port = 3000;
const numCPUs = require('os').cpus().length;
const cluster = require('cluster');
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    const app = require('./app').default;
    app.listen(port, err => {
        if (err) {
            return console.error(err);
        }
        console.log(`server is listening on ${port}`);
    });
    console.log(`Worker ${process.pid} started`);
}
