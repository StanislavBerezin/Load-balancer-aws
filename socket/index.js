//packages
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 8888
const app = express()

app.use(bodyParser.json())
app.use(cors())

let server = app.listen(port, function (err) {
    if (err) throw err;
    console.log("Socket available at " + port);
})

const io = require('socket.io').listen(server)

require('./socket')(app, io)