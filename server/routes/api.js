const express = require('express');
const apiController = require('../controllers/mainController')
const router = express.Router();

router.post('/hello',
    apiController.welcomeUser
);



module.exports = router;