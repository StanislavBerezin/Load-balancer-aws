const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({
    dev
})
const nextHandler = nextApp.getRequestHandler()


const routes = {
    api: require('./routes/api')(app, io)
}


//  ME FINISHED
nextApp.prepare().then(() => {



    routes.api

    app.get('*', (req, res) => {
        return nextHandler(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`Running on port: ${port}`)

    })
})