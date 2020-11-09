var express = require('express');
var router = express.Router();
var cate = require('../controller/CateController')

/* GET home page. */
router.get('/', cate.getCate);
router.get('/getPostCate', cate.getPostCate);

module.exports = router;
