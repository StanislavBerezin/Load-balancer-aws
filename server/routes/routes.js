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
                            console.log(result.score);
                            sendMessage(result.score);
                        }

                    });

                    stream.on("error", error => {
                        console.log("error");
                    });

                    twitterStream = stream;
                }
            );
        }
    };

    /**
     * Sets search word for twitter stream.
     */
    app.post("/specificSearch", async (req, res) => {
        let term = await req.body.search;
        console.log(term);
        app.locals.searchWord = term;

        stream();
        res.send("s");
    });

    /**
     * Pauses the twitter stream.
     */
    app.post("/stop", (req, res) => {
        console.log("Stop");
        twitterStream.destroy();
        socketConnection.disconnect();
        app.locals.searchWord = "none";
        res.status(200).send("done");
    });

    app.get("/streamTweets", MainControl.searchTweets);

    //Establishes socket connection.
    io.on("connection", socket => {
        socketConnection = socket;
        stream();
        socket.on("connection", () => console.log("Client connected"));
        socket.on("disconnect", () => console.log("Client disconnected"));
    });


    const sendMessage = msg => {
        socketConnection.emit("tweets", msg);
    };
};