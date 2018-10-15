//packages
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const config = require('./config/config')







const app = express()


// using packages
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(helmet())
app.use(cors())


//requireing app and passing the object of this app




// configuring the port which is from config folder
let server = app.listen(config.port, function (err) {
	if (err) throw err;
	console.log("Server started on port " + config.port);
});

const io = require('socket.io').listen(server)

require('./routes/routes')(app, io)