var express = require('express');
var router = express.Router();
router.get('/save',function(req,res,next){
   //获取path
    var path =req.body.path;
   //获取txt
    //var txt=req.body.txtMain;
   res.send(path);
});
/* GET home page. */
router.get('/*', function(req, res, next) {
    //获取orginPath
    var path = req.originalUrl;
    //获取文件内容
    var txt= 'test';
  res.render('pnote/index', { text: txt,path: path });
});


module.exports = router;
