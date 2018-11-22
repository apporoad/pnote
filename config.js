

var config = require('./config.json')
config.port = config.port || 80

config.dbPath = config.dbPath || (__dirname + "/db.json")

exports.get =()=>{
    return config
}