

//var config = require('./config.json')

var config = require('cli.config.js').system("pnote-site").default(require('./config.json'))

var c = config.get()
c.port = c.port || 80

c.dbPath = c.dbPath || (__dirname + "/db.json")

exports.get =()=>{
    return c
}