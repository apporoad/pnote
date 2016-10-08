var express = require('express');
require('NString');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //获取orginPath
    var path = req.originalUrl;
    path=path.trimEnd('/');
    //获取文件内容
    var txt= 'test';
  res.render('pnote/index', { text: txt,path: path });
});

router.get('/save',function(req,res,next){
   //获取path
    var path =req.body.path;
   //获取txt
    var txt=req.body.txtMain;
   res.render('pnote/index', {text:txt,path:path});
});
module.exports = router;
