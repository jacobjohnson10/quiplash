const Router = require('express').Router

module.exports = Router({mergeParams: true})
.get('/v1/prompt', async (req, res, next) => {


	var MongoClient = require('mongodb').MongoClient;

	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  dbo.collection("Questions").findOne({}, function(err, result) {
	    if (err) throw err;
	    console.log(result.name);
	    res.json(result.name)
	    db.close();
	  });
	});
})
