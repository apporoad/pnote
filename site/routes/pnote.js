var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pnote/index', { text: '' });
});

router.get('/save',function(req,res,next){
    req.query
   res.render('pnote/index', {text:''})
});
module.exports = router;
