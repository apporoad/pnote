var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/test';


//插入
var insertData = function(db, callback) {
    //连接到表
    var collection = db.collection('tb2');
    //插入数据
    var data = [{"name":'wilson001',"age":21},{"name":'wilson002',"age":22}];
    collection.insert(data, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
}

MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log(err);
    console.log("连接成功！");
    insertData(db, function(result) {
        console.log(result);
        db.close();
    });
});

// //查询
// var selectData = function(db, callback) {  
//   //连接到表  
//   var collection = db.collection('tb2');
//   //查询数据
//   var whereStr = {"name":'wilson001'};
//   collection.find(whereStr).toArray(function(err, result) {
//     if(err)
//     {
//       console.log('Error:'+ err);
//       return;
//     }     
//     callback(result);
//   });
// }

// MongoClient.connect(DB_CONN_STR, function(err, db) {
//   console.log("连接成功！");
//   selectData(db, function(result) {
//     console.log(result);
//     db.close();
//   });
// });

// //修改
// var updateData = function(db, callback) {  
//     //连接到表  
//     var collection = db.collection('tb2');
//     //更新数据
//     var whereStr = {"name":'wilson001'};
//     var updateStr = {$set: { "age" : 100 }};
//     collection.update(whereStr,updateStr, function(err, result) {
//         if(err)
//         {
//             console.log('Error:'+ err);
//             return;
//         }     
//         callback(result);
//     });
// }

// MongoClient.connect(DB_CONN_STR, function(err, db) {
//     console.log("连接成功！");
//     updateData(db, function(result) {
//         console.log(result);
//         db.close();
//     });
// });

// //删除
// var delData = function(db, callback) {  
//   //连接到表  
//   var collection = db.collection('tb2');
//   //删除数据
//   var whereStr = {"name":'wilson001'};
//   collection.remove(whereStr, function(err, result) {
//     if(err)
//     {
//       console.log('Error:'+ err);
//       return;
//     }     
//     callback(result);
//   });
// }

// MongoClient.connect(DB_CONN_STR, function(err, db) {
//   console.log("连接成功！");
//   delData(db, function(result) {
//     console.log(result);
//     db.close();
//   });
// });