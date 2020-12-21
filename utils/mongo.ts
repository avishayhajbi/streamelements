require('../models');
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;

mongoose.Promise = Promise

mongoose.connection.on('connected', () => {
    console.log('Connection Established')
})

mongoose.connection.on('reconnected', () => {
    console.log('Connection Reestablished')
})

mongoose.connection.on('disconnected', () => {
    console.log('Connection Disconnected')
})

mongoose.connection.on('close', () => {
    console.log('Connection Closed')
})

mongoose.connection.on('error', (error) => {
    console.log('ERROR: ' + error)
})

const run = async () => {
    await mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
}

run().catch(error => console.error(error))
