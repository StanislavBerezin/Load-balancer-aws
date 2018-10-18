module.exports = {
  port: process.env.PORT || 8080,

  db: {
    url: "mongodb://CAB432:CAB432STAS@cluster0-shard-00-00-zl6aa.mongodb.net:27017,cluster0-shard-00-01-zl6aa.mongodb.net:27017,cluster0-shard-00-02-zl6aa.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
  }
}