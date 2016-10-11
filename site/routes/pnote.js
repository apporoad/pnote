var express = require('express');
var router = express.Router();
var db=require('./js/mongoHelper');
router.post('/save',function(req,res){
   //获取path
    var path =req.body.path;
    var text = req.body.text;

    //修改数据库
    var p3={};
    p3.collection="remark";
    p3.updateStr={$set: { "text" : text }};
    p3.whereStr={"path":path};
    db.update(null,p3,function(result){
    });
    res.json({success:path});
});

//列表
router.get('/(all|list)',function(req,res,next){
     //获取orginPath
    var path = req.originalUrl;
    //获取文件内容
    var p2={};
    p2.collection= 'remark';
    p2.whereStr={"text":{$ne:''}};
    db.select(null,p2,function (result) {
        res.render('pnote/index', { list : result });
    });

});
/* GET home page. */
router.get('/*', function(req, res, next) {
    //获取orginPath
    var path = req.originalUrl;
    //获取文件内容
    var p2={};
    p2.collection= 'remark';
    p2.whereStr={"path":path};
    db.select(null,p2,function (result) {
        var txt = '';
        if(result.length >0)
        {
            txt=result[0].text;
        }
        else
        {
            //插入一条空数据
            var p1={};
            p1.collection='remark';
            p1.data= {"path":path,"text":""};
            db.insert(null,p1,function (result) {});
        }
        res.render('pnote/index', { text: txt,path: path });
    });

});


module.exports = router;
