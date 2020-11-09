var express = require('express');
var router = express.Router();
var User = require('../controller/UserController')

/* GET users listing. */
router.post('/sendCode',User.sendCode );
router.post('/verCodePhoneLogin',User.verCodePhoneLogin );

module.exports = router;
