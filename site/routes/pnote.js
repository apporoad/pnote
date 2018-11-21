var express = require('express');
var router = express.Router();
var fs = require('fs')
var pp = require('path')
// var db=require('./js/mongoHelper');

var storage = require('mini-dbx');
var db = storage('../../db.json');


router.post('/save',function(req,res){
   //获取path
    var path =req.body.path;
    var text = req.body.text;

    //查看有没有
    var datas = db.select(path)
    
    if(datas.length> 0){
        //修改
        db.update(path,{data:text},'#==0')
    }else{
        //insert
        db.insert(path,{data : text})
    }
    res.json({success:path});
});

//列表
router.get('/list',function(req,res,next){
     //获取orginPath
    var path = req.originalUrl;
    //获取文件内容
    // var p2={};
    // p2.collection= 'remark';
    // p2.whereStr={"text":{$ne:''}};
    // db.select(null,p2,function (result) {
    //     res.render('pnote/list', { list : result });
    // });

    fs.readFile( pp.resolve(__dirname, '../..')+  '/db.json','utf8',function (err, data) {
        if(err) console.log(err);
        var test1=JSON.parse(data);
        var rs = new Array()
        for(var key in test1)
            rs.push({ path : key})
        res.render('pnote/list', { list : rs });
    });

});
/* GET home page. */
router.get('/*', function(req, res, next) {
    //获取orginPath
    var path = req.originalUrl;
    //获取文件内容
    var result = db.select(path,'#==0')
    if(result.length >0)
    {
        txt=result[0].data;
    }
    else
    {
       txt =''
    }
    res.render('pnote/index', { text: txt,path: path });

});


module.exports = router;
