var Twitter = require("twitter");
var Sentiment = require("sentiment");
var twitter = new Twitter({
    consumer_key: "C2tUjaWK9qOOU6BFWIMd52v45",
    consumer_secret: "FIAjgruq3Kx09Iwwh0NiQYPp7wLyzG4wFzfSHiRowLBjy8S4md",
    access_token_key: "843837609797287938-qcJFHUWUJY74tJ2Hdn6Jm4obRII7IlI",
    access_token_secret: "eSdfw7DUEa0zMTpBBYmHcVjSrkwr8TGcETRP4hYLO795m"
});
var sentiment = new Sentiment();

var Flickr = require("node-flickr");
var keys = {"api_key": "a5bc0ff84bf86a9d7b8e9313b4fa3388"}
flickr = new Flickr(keys);

module.exports = (app, io) => {

    let socketConnection;
    let twitterStream;

    app.locals.searchWord = "none"; //Default search term for twitter stream.
    app.locals.showRetweets = false; //Default

    const stream = () => {
        let positive = []
        let negative = []
        let negativePie
        let positivePie
        let sum
        let negPercent
        let posPercent
        let negWords = []
        let posWords = []
        let reducer = (accumulator, currentValue) => accumulator + currentValue;
        let position=0;

        try {
            if (app.locals.searchWord === "none") {
                console.log("nothing to search for");
            } else {
                console.log("Getting tweets for " + app.locals.searchWord);
                twitter.stream("statuses/filter", {
                        track: app.locals.searchWord
                    },

                    stream => {
                        stream.on("data", tweet => {
                            var result = sentiment.analyze(tweet.text);
                            if (result.score != 0) {
                                //  [...new Set(negative)];
                                if (result.score > 0) {
                                    positive = [result.score].concat(positive);
                                    

                                    posWords.push([result.positive[0]]);

                                   
                        
                                } else {
                                    negative = [result.score].concat(negative);
                                    negWords.push([result.negative[0]]);
                                }
                                positivePie = positive.reduce(reducer)
                                negativePie = Math.abs(negative.reduce(reducer))
                                sum = positivePie + negativePie;
                                posPercent = (positivePie * 100) / sum;
                                negPercent = (negativePie * 100) / sum;

                                let sentimentObject = {
                                    negWords,
                                    posWords,
                                    positivePie,
                                    negativePie,
                                    posPercent,
                                    negPercent
                                } 

                                //flickr

                            
                    
                           console.log("position: "+ position);
                         
                           {
                               if(position%5==0)
                               {
                                    console.log("word no. : "+ position);
                                    let word="";
                                    if(posWords[0]!=undefined)
                                    {
                                        word=posWords[0][0];
                                    }
                                   console.log("WORD IS: "+ word);
                                    flickr.get("photos.search", {"text": word, "per+page": 500, }, function(err, result)
                                    {
                                        if (err) return console.error(err);
                                        var xx = result.photos.photo.length;
                                        console.log("photos returned: "+ xx);
                                        for (let i=0;i<xx;i++) // for each photo
                                
                                            {
                                                var p_id = result.photos.photo[i].id;
                                                flickr.get("photos.comments.getList", {"photo_id": p_id}, function(err, result2){
                                                    if(err) return console.error(err);
                                                    //console.log(result2.comments.comment);
                                                    if(result2.comments.comment != null) // check if it has comments
                                                    {
                                                       // console.log("No. of comments: "+result2.comments.comment.length);
                                                        for(let numberofComments=0; numberofComments < result2.comments.comment.length; numberofComments++)
                                                        {
                                                            let currentComment = (result2.comments.comment[numberofComments]._content);
                                                           // console.log("Comment No: "+ numberofComments + "comment: "+ currentComment);
                                                            for(let y=0;y<50;y++)
                                                            {

                                                            var output = sentiment.analyze(currentComment);
                                                            }
                                                            //console.log(output);
                                                                            
                                                        }
                                                        
                                                    }

                                                })
                                            }
                        

                                    });
                               }

                           }

                
                           position=position+1;

                                //end flickr                              
                                
                            sendMessage(sentimentObject)

                                negWords = []
                                posWords = []
                            }
                        });

                        stream.on("error", error => {
                            console.log(error)
                        });
                        twitterStream = stream;
                    }
                );
            }
        } catch (e) {
            console.log(e)
        }


    };




    app.post("/initialiseStream", async (req, res) => {

        try {
            let term = await req.body.search;
            console.log(term);
            app.locals.searchWord = term;

            stream();
            res.send("Started");
        } catch (e) {
            console.log(e)
        }

    });

    /**
     * Pauses the twitter stream.
     */
    app.post("/stopStream", (req, res) => {
        console.log("Stop");
        try {
            if (twitterStream) {
                twitterStream.destroy();
            } else if (socketConnection) {
                socketConnection.disconnect()
            }
            console.log("Client disconnected")
            console.log("All sockets are closed")
            app.locals.searchWord = "none";
            res.status(200).send("done");
        } catch (e) {
            console.log(e)
        }

    });

    io.on("connection", socket => {
        socketConnection = socket;
        stream();
        socket.on("connection", () => console.log("Client connected"));
        socket.on("disconnect", () => {
            console.log("Client disconnected")
            if (twitterStream) {
                twitterStream.destroy();
            } else if (socketConnection) {
                socketConnection.disconnect()
            }


            console.log("All sockets are closed")
        });
    });


    const sendMessage = msg => {
        socketConnection.emit("tweets", msg);
    };


}