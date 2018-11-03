const mainControl = require("../controllers/MainController");


//recieves object of express app and makes routes

module.exports = (app) => {

    /**
     * Sets search word for twitter stream.
     */
    app.post("/specificSearch", mainControl.specSearch);

    app.post('/flick', mainControl.overload)
    app.post('/saveDB', mainControl.saveResults);

    app.post('/viewDB', mainControl.viewResults);

    app.post('/fib', mainControl.fib)


    //Establishes socket connection.


};