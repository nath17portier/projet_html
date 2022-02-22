const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:4200']
    }
});

const { v4: uuidv4 } = require('uuid');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";

var jeu1 = [];
var capaciteJeu1 = 2;
var jeu2 = [];

io.on("connection", socket => {


  socket.on("jeu1", (playerName) =>{
	  	//console.log("Jeu 1");
	  	if(jeu1.length!=0){
			if(jeu1[jeu1.length-1].players.length<capaciteJeu1){
				var roomId = addToExistingRoom(jeu1,socket.id, playerName);
				socket.join(roomId);
				/*console.log(roomId);
				socket.emit("AddedToGame1");
		        for (var i = jeu1[jeu1.length-1].players.length - 1; i >= 0; i--) {
		          console.log(jeu1[jeu1.length-1].players[i]);
		        console.log(jeu1[jeu1.length-1].playerNames);
		        }*/
		        var tabOperations = createOperations();
		        
				io.sockets.in(roomId).emit("roomReady1",roomId,jeu1[jeu1.length-1].players,jeu1[jeu1.length-1].playerNames, tabOperations);
			}
			else{
				var roomId = uuidv4();
				socket.join(roomId);
				createNewRoom(jeu1,socket.id, roomId, playerName);
				socket.emit("AddedToGame1");
			}
	  	}
	  	else{
	  		var roomId = uuidv4();
	  		socket.join(roomId);
	  		console.log(roomId);
	  		createNewRoom(jeu1,socket.id, roomId, playerName);
	  		socket.emit("AddedToGame1");
	  	}
	  	
	  })

  socket.on("undoJeu1", (playerPseudo) =>{
  		if (jeu1[jeu1.length-1].playerNames.includes(playerPseudo)) {
  			jeu1.splice(jeu1.length-1,1);
	  		//console.log(jeu1);
  		}
	  	
	  })

  socket.on("jeu2", () =>{
	  	//console.log("Jeu 2");
	  	socket.emit("AddedToGame2");
	  })


  socket.on("player1Scored", (roomId)=>{
	  	console.log("player 1 scored");
	  	io.sockets.in(roomId).emit("player1Scored", roomId);
	  })

  socket.on("player2Scored", (roomId)=>{
	  	//console.log("player 2 scored");
	  	io.sockets.in(roomId).emit("player2Scored", roomId);
	  })

  socket.on("endGame1", (roomId)=>{
	    //console.log("##################")
	    removeGameRoom(roomId,jeu1);
	})

  socket.on("connectRequest", (name, pass) => {
	  	//console.log(name,pass);
	  	MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  const dbo = db.db("mydb");
		  dbo.collection("users").find({name:name, password:pass}).toArray(function(err, result) {
		    if (err) throw err;
		    if(result.length==1){
		    	socket.emit("connectResult", true, result[0].lvlGeneral, result[0].lvlPicross, result[0].id);
		    	//console.log("connection accepted");
		    }
		    else{
		    	socket.emit("connectResult", false);
		    	//console.log("connection refused");
		    }
		    //db.close();
		  });
		});
	  	
	  });

  socket.on("inscription", (name, pass) => {
	  	//console.log(name, pass);
	  	MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  const dbo = db.db("mydb");
		  dbo.collection("users").find({name:name}).toArray(function(err, result) {
		    if (err) throw err;
		    //console.log(result);
		    if(result.length==0){
		    	dbo.collection("users").insertOne({name:name,password:pass, lvlGeneral:1, lvlPicross:1, id : uuidv4()},function(err,res){
		    		if (err) throw err;
		    		//console.log("user inséré");
		    		socket.emit("inscriptionResult", true);
		    	})
		    }
		    else{
		    	socket.emit("inscriptionResult", false);
		    	//console.log("nom deja utilisé");
		    }
		    //db.close();
		  });
		});

	  	
	  })

  socket.on("disconnecting",()=>{
  	//console.log(socket.id);
  	if (jeu1[jeu1.length-1] != undefined) {
  		if(jeu1[jeu1.length-1].players.length == 1 && jeu1[jeu1.length-1].players[0] == socket.id){
			jeu1.splice(jeu1.length-1,1)
		}
  	}
	
	//console.log(jeu1);
  })

  socket.on("leaveRoom", (roomId) =>{
  	socket.leave(roomId);
  })

  socket.on("lvlUpPicross", (lvl, userId)=>{
  	MongoClient.connect(url, function(err, db) {
	 	if (err) throw err;
	  	const dbo = db.db("mydb");
		dbo.collection("users").updateOne({id:userId},{$set:{lvlPicross:lvl+1}})
  	});
  })

  socket.on("lvlUpGeneral", (lvl, userId)=>{
  	MongoClient.connect(url, function(err, db) {
	 	if (err) throw err;
	  	const dbo = db.db("mydb");
		dbo.collection("users").updateOne({id:userId},{$set:{lvlGeneral:lvl+1}})
  	});
  })

});



http.listen(3080, () => {
  console.log('Listening on port 3080');
});


function createNewRoom(jeu, socketId, roomId, playerName ){
	jeu.push({ 	id : roomId,
				players : [socketId],
				playerNames : [playerName]
			});
	//console.log(jeu);
}

function addToExistingRoom(jeu, socketId, playerName){
	jeu[jeu.length-1].players.push(socketId);
	jeu[jeu.length-1].playerNames.push(playerName);
	//console.log(jeu);
	return(jeu[jeu.length-1].id)
}

function removeGameRoom(roomId,jeu){

  for (var i = 0; i < jeu.length; i++) {
    if(jeu[i].id == roomId){
      jeu.splice(i,1);
    }
  }
}

function createOperations(){
	var listeResultats = [];
	for (var i = 0; i < 10; i++) {
		//entre 0 et 9
		var rd = Math.floor(Math.random() * 10);
		var res;
		if(rd<=3){
			res = createAddition();
		}
		else if(rd>3 && rd<7){
			res = createSoustraction();
		}
		else{
			res = createMultiplication();
		}
		listeResultats.push(res);
		
	}

	return listeResultats;
}

function createAddition(){
	//entre 100 et 999
	var a1 = Math.floor(Math.random() * 900)+100;
	var a2 = Math.floor(Math.random() * 900)+100;
	return { operation: a1+"+"+a2, 
			 result : a1+a2 }
}

function createMultiplication(){
	//entre 10 et 50
	var a1 = Math.floor(Math.random() * 11)+10;
	var a2 = Math.floor(Math.random() * 11)+10;
	return { operation: a1+"x"+a2, 
			 result : a1*a2 }
}

function createSoustraction(){
	//entre 100 et 999
	var a1 = Math.floor(Math.random() * 250)+50;
	//entre 100 et a1
	var a2 = Math.floor(Math.random() * (a1-49))+50;
	return { operation: a1+"-"+a2, 
			 result : a1-a2 }
}