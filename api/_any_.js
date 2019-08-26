const fs = require('fs')
const path= require('path')



module.exports = {
    "@get" : async function(parm,ctx){
        if(!global.indexCache){
            global.indexCache = fs.readFileSync( path.resolve(__dirname,  '../static/index.html'),'utf-8')
        }
        var rPath = path.dirname(ctx.originalUrl)
        //console.log(ctx.originalUrl)
        //console.log(ctx)
        if(rPath.length>1){
            return global.indexCache.replace(/js\//g,  path.relative(rPath, '/')  + '/js/').replace(/css\//g,  path.relative(rPath, '/')  + '/css/')
        }
        return global.indexCache
    }
}