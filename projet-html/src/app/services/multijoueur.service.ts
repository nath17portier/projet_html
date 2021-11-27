import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ConnexionService } from '../services/connexion.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})

export class MultijoueurService {

	mySocket :Socket;
	match = new Subject<any>();
	roomId:string = "";
	players:string[];

	constructor(private connexionService : ConnexionService, private router : Router) {

		this.mySocket = this.connexionService.getSocket();
		this.match.next(false);
	}


	ConnectToGame1(){
		console.log(this.mySocket.ioSocket.id);
		this.mySocket.emit("jeu1");
		this.mySocket.on("AddedToGame1",() =>{
			this.router.navigate(["/multijoueur-lobby"]);
		});
		this.mySocket.on("roomReady1", (roomId:string, players:string[]) =>{
			this.match.next(true);
			this.roomId = roomId ;
			this.players = players;
			setTimeout(()=>{
				console.log(players);
				
				this.router.navigate(["/multijeu1"]);
			},2000);
		});
	}

	ConnectToGame2(){
		console.log(this.mySocket.ioSocket.id);
		this.mySocket.emit("jeu2");
		this.mySocket.on("AddedToGame2",() =>{
			console.log("AddedToGame2");
			this.router.navigate(["/multijoueur-lobby"]);
		});
	}


	getMatch(){
		return this.match.asObservable();
	}

	getRoomId(){
		return this.roomId;
	}

	getPlayers(){
		return this.players;
	}

	endGame(roomId:string,victory:boolean,gameNumber:number){
		if(victory){
			switch (gameNumber) {
				case 1:
					this.mySocket.emit("endGame1",roomId);
					break;
				case 2:
					this.mySocket.emit("endGame2",roomId);
					break;
			}
		}
		this.router.navigate(["/multijoueur"]);
	}
}