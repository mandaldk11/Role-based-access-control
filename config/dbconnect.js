const mongoose = require('mongoose');

dbconnect()
    .then(() => {
        console.log('db connected...')
    })
    .catch(err => console.log(err));

async function dbconnect() {
    await mongoose.connect('mongodb://127.0.0.1:27017/auth_db');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = { dbconnect }