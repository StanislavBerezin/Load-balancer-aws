const MainControl = require('../controllers/MainController')

//recieves object of express app and makes routes

module.exports = (app) => {

    // setting up routes

    app.get('/new',
        MainControl.searchTweets)




}