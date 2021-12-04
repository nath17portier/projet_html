const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:4200']
    }
});

<<<<<<< HEAD
const { v4: uuidv4 } = require('uuid');

var jeu1 = [];
var capaciteJeu1 = 2;
var jeu2 = [];

io.on("connection", socket => {
  socket.on("jeu1", () =>{
  	console.log("Jeu 1");
  	if(jeu1.length!=0){
		if(jeu1[jeu1.length-1].players.length<capaciteJeu1){
			var roomId = addToExistingRoom(jeu1,socket.id);
			socket.join(roomId);
			console.log(roomId);
			socket.emit("AddedToGame1");
      for (var i = jeu1[jeu1.length-1].players.length - 1; i >= 0; i--) {
        console.log(jeu1[jeu1.length-1].players[i]);
      }
			io.to(roomId).emit("roomReady1",roomId,jeu1[jeu1.length-1].players);
		}
		else{
			var roomId = uuidv4();
			socket.join(roomId);
			createNewRoom(jeu1,socket.id, roomId);
			socket.emit("AddedToGame1");
		}
  	}
  	else{
  		var roomId = uuidv4();
  		socket.join(roomId);
  		console.log(roomId);
  		createNewRoom(jeu1,socket.id, roomId);
  		socket.emit("AddedToGame1");
  	}
  	
  })

  socket.on("jeu2", () =>{
  	console.log("Jeu 2");
  	socket.emit("AddedToGame2");
  })


  socket.on("player1Scored", (roomId)=>{
  	console.log("player 1 scored");
  	io.to(roomId).emit("player1Scored");
  })

  socket.on("player2Scored", (roomId)=>{
  	console.log("player 2 scored");
  	io.to(roomId).emit("player2Scored");
  })

  socket.on("endGame1", (roomId)=>{
    console.log("##################")
    removeGameRoom(roomId,jeu1);
=======
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

  	
>>>>>>> main
  })

});

http.listen(3080, () => {
  console.log('Listening on port 3080');
});


function createNewRoom(jeu, socketId, roomId){
	jeu.push({ 	id : roomId,
				players : [socketId]});
	console.log(jeu);
}

function addToExistingRoom(jeu, socketId){
	jeu[jeu.length-1].players.push(socketId);
	console.log(jeu);
	return(jeu[jeu.length-1].id)
}

function removeGameRoom(roomId,jeu){
  for (var i = 0; i < jeu.length; i++) {
    if(jeu[i].id == roomId){
      jeu.splice(i,1);
    }
  }
}