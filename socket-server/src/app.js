const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:4200']
    }
});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";


io.on("connection", socket => {
  console.log("someone connected");
  //console.log(socket);

  socket.on("connectRequest", (name, pass) => {
  	console.log(name,pass);
  	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  const dbo = db.db("mydb");
	  dbo.collection("users").find({name:name, password:pass}).toArray(function(err, result) {
	    if (err) throw err;
	    console.log(result);
	    if(result.length==1){
	    	socket.emit("connectResult", true);
	    	console.log("connection accepted");
	    }
	    else{
	    	socket.emit("connectResult", false);
	    	console.log("connection refused");
	    }
	    //db.close();
	  });
	});
  	
  });

  socket.on("inscription", (name, pass) => {
  	console.log(name, pass);
  	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  const dbo = db.db("mydb");
	  dbo.collection("users").find({name:name}).toArray(function(err, result) {
	    if (err) throw err;
	    console.log(result);
	    if(result.length==0){
	    	dbo.collection("users").insertOne({name:name,password:pass},function(err,res){
	    		if (err) throw err;
	    		console.log("user inséré");
	    		socket.emit("inscriptionResult", true);
	    	})
	    }
	    else{
	    	socket.emit("inscriptionResult", false);
	    	console.log("nom deja utilisé");
	    }
	    //db.close();
	  });
	});

  	
  })

});

http.listen(3080, () => {
  console.log('Listening on port 3080');
});