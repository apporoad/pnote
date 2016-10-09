var mongoose = require('mongoose');    //引用mongoose模块
mongoose.connect("mongodb://localhost:27017/test");
var db = mongoose.connection;


var PNoteSchema = new mongoose.Schema({
      path:String,   //定义一个属性name，类型为String
      text:String
    });
    
var PNoteModel = db.model('PNote',PNoteSchema);

var pNoteEntity = new PNoteModel({path:'\pnote\test',text:'test'});

pNoteEntity.save();