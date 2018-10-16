const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')
const bodyParser = require('body-parser');
var Twitter = require("twitter");
var Sentiment = require("sentiment");
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({
    dev
})
const nextHandler = nextApp.getRequestHandler()

const routes = {
    api: require('./routes/api')
}

// socket.io server

// ME
var twitter = new Twitter({
    consumer_key: "C2tUjaWK9qOOU6BFWIMd52v45",
    consumer_secret: "FIAjgruq3Kx09Iwwh0NiQYPp7wLyzG4wFzfSHiRowLBjy8S4md",
    access_token_key: "843837609797287938-qcJFHUWUJY74tJ2Hdn6Jm4obRII7IlI",
    access_token_secret: "eSdfw7DUEa0zMTpBBYmHcVjSrkwr8TGcETRP4hYLO795m"
});

let socketConnection;
let twitterStream;

app.locals.searchWord = "none"; //Default search term for twitter stream.
app.locals.showRetweets = false; //Default

var sentiment = new Sentiment();


const sendMessage = msg => {
    socketConnection.emit("tweets", msg);
};

const stream = () => {
    try {
        if (app.locals.searchWord === "none") {
            console.log("nothing to search for");
        } else {
            console.log("Getting tweets for " + app.locals.searchWord);
            twitter.stream(
                "statuses/filter", {
                    track: app.locals.searchWord
                },
                stream => {

                    stream.on("data", tweet => {
                        var result = sentiment.analyze(tweet.text);
                        // result.positive and result.negative

                        if (result.score != 0) {
                            let sentimentObject = {
                                score: result.score,
                                positiveWords: result.positive,
                                negativeWords: result.negative
                            }

                            console.log(sentimentObject.score)
                            setInterval(function () {
                                sendMessage(sentimentObject)
                            }, 2000);

                        }

                    });

                    stream.on("error", error => {

                    });

                    twitterStream = stream;
                }
            );
        }
    } catch (e) {
        console.log(e)
    }

};

io.on("connection", socket => {
    socketConnection = socket;
    stream();

    socket.on("connection", () => console.log("Client connected"));
    socket.on("disconnect", () => console.log("Client disconnected"));
});



//  ME FINISHED
nextApp.prepare().then(() => {
    app.use(bodyParser.json())


    app.use('/api', routes.api)
    app.get('*', (req, res) => {
        return nextHandler(req, res)
    })


    app.post("/specificSearch", async (req, res) => {
        console.log(req.body);
        try {
            let term = await req.body.search;

            app.locals.searchWord = term;

            stream();
            res.send("s");
        } catch (e) {
            console.log("1")
        }

    });

    app.post("/stop", (req, res) => {
        console.log("Stop");
        try {
            twitterStream.destroy();
            socketConnection.disconnect();
            app.locals.searchWord = "none";
            res.status(200).send("done");
        } catch (e) {
            console.log(e)
        }

    });
















    server.listen(port, (err) => {
        if (err) throw err
        console.log(`Running on port: ${port}`)
        console.log(process.env.PORT)
    })
})