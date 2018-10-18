const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.connect(config.db.url, {
    useNewUrlParser: true,
}).then((res) => {
    console.log("connected ")
}).catch(e => {
    console.log('didnt connect ' + e)
})