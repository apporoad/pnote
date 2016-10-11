var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/pnote';

function dbOperate(type,connStr,params,callback)
{
    if(!connStr)
    {   
        connStr=DB_CONN_STR;
    }
    MongoClient.connect(connStr, function(err, db) {
        if(!err)
        {
             switch(type)
            {
                case 'insert':
                    var collection = db.collection(params.collection);
                    var data = params.data;
                    collection.insert(data,function (err,result) {
                        if(err){
                            console.log('error:' + err);
                        }
                        callback(result);
                        db.close();
                    });
                break;
                case 'update':
                    var collection = db.collection(params.collection);
                    var whereStr= params.whereStr;
                    var updateStr = params.updateStr;
                    collection.update(whereStr,updateStr, function(err, result)  {
                        if(err)
                        {
                        console.log('Error:'+ err);
                        return;
                        }     
                        callback(result);
                        db.close();
                     });
                break;
                case 'delete':
                    var collection = db.collection(params.collection);
                    var whereStr= params.whereStr;
                    collection.remove(whereStr, function(err, result) {
                        if(err)
                        {
                        console.log('Error:'+ err);
                        return;
                        }     
                        callback(result);
                        db.close();
                     });
                break;
                case 'select':
                    var collection = db.collection(params.collection);
                    var whereStr= params.whereStr;
                    collection.find(whereStr).toArray(function(err, result) {
                        if(err)
                        {
                        console.log('Error:'+ err);
                        return;
                        }     
                        callback(result);
                        db.close();
                     });
                break;
                default:
                break;
            }
        }
    });
}

function MongoDbM(){}
MongoDbM.prototype.insert=function (connStr,params,callback) {
    dbOperate('insert',connStr,params,callback);
};
MongoDbM.prototype.update=function (connStr,params,callback) {
    dbOperate('update',connStr,params,callback);
};
MongoDbM.prototype.remove=function (connStr,params,callback) {
    dbOperate('delete',connStr,params,callback);
};
MongoDbM.prototype.select=function (connStr,params,callback) {
    dbOperate('select',connStr,params,callback);
};

var mongo= new MongoDbM();

module.exports = mongo;