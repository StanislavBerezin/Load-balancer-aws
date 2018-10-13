//packages
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const config = require('./config/config')
const socketIo = require("socket.io");




const app = express()
// using packages
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(helmet())
app.use(cors())


//requireing app and passing the object of this app
require('./routes/routes')(app)


// configuring the port which is from config folder
app.listen(config.port, function (err) {
	if (err) throw err;
	console.log("Server started on port " + config.port);
});