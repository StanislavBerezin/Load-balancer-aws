const MainControl = require("../controllers/MainController");
var Twitter = require("twitter");

var Sentiment = require("sentiment");

//recieves object of express app and makes routes

module.exports = (app, io) => {
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

    /**
     * Resumes twitter stream.
     */
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

    /**
     * Sets search word for twitter stream.
     */
    app.post("/specificSearch", async (req, res) => {
        try {
            let term = await req.body.search;
            console.log(term);
            app.locals.searchWord = term;

            stream();
            res.send("s");
        } catch (e) {
            console.log(e)
        }

    });

    /**
     * Pauses the twitter stream.
     */
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

    app.get("/streamTweets", MainControl.searchTweets);

    //Establishes socket connection.

    io.on("connection", socket => {
        socketConnection = socket;
        stream();
        console.log(socket.nsp.server.nsps)
        socket.on("connection", () => console.log("Client connected"));
        socket.on("disconnect", () => console.log("Client disconnected"));
    });


    const sendMessage = msg => {
        socketConnection.emit("tweets", msg);
    };
};