var AYLIENTextAPI = require("aylien_textapi");

var textapi = new AYLIENTextAPI({
    application_id: "883d946f",
    application_key: "a18910bab0bc6b8975c656f03b0c5460"
});

var Twit = require("twit");
var Twitter = new Twit({
    consumer_key: "C2tUjaWK9qOOU6BFWIMd52v45",
    consumer_secret: "FIAjgruq3Kx09Iwwh0NiQYPp7wLyzG4wFzfSHiRowLBjy8S4md",
    access_token: "843837609797287938-qcJFHUWUJY74tJ2Hdn6Jm4obRII7IlI",
    access_token_secret: "eSdfw7DUEa0zMTpBBYmHcVjSrkwr8TGcETRP4hYLO795m"
});






module.exports = {
    // Displaying the basic news on the first page
    async searchTweets(req, res) {

        var stream = Twitter.stream('statuses/filter', {
            track: '#apple',
            language: 'en'
        })

        stream.on('tweet', function (tweet) {
            console.log(tweet)
            res.send(tweet)
        })


    },


};