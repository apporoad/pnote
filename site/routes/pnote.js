var express = require('express');
var router = express.Router();
var fs = require('fs')
var pp = require('path')
var config = require('../../config.js').get()
// var db=require('./js/mongoHelper');

var storage = require('mini-dbx');
var db = storage(config.dbPath);


router.post('/save',function(req,res){
   //获取path
    var path =req.body.path;
    var text = req.body.text;

    //查看有没有
    var datas = db.select(path)
    
    if(datas.length> 0){
        //修改
        if(text){
            console.log('修改成功: ' + path + " : " + text)
            db.update(path,{data:text},'#==0')
        }else{
            console.log('删除成功 ' + path)
            db.remove(path)
        }
    }else{
        //insert
        if(text){
            console.log('新增成功: ' + path + " : " + text)
            db.insert(path,{data : text})
        }
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

    fs.readFile( config.dbPath,'utf8',function (err, data) {
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
    res.render('pnote/index', { text: txt,path: path,cpath: path.substring(1) });

});


module.exports = router;
