var db=require('./mongoHelper');

//insert
var p1={};
p1.collection='mTest';
p1.data=[{"name":'lxy',"text":12},{"name":'lxx',"text":'nihao'}];
// db.insert(null,p1,function (result) {
//     console.log(result);
//     console.log("+++++++++++++++++++++++++++++++++++++++++");
    
// });


// //update
// var p3={};
// p3.collection=p1.collection;
// p3.updateStr={$set: { "text" : 100 }};
// p3.whereStr={"name":'lxy'};
// db.update(null,p3,function(result){
//     console.log(result);
//     console.log("+++++++++++++++++++++++++++++++++++++++++");
// });


//select 
var p2={};
p2.collection=p1.collection;
p2.whereStr={"name":'lxy'};
db.select(null,p2,function (result) {
    console.log(result);
    console.log("+++++++++++++++++++++++++++++++++++++++++");
});

