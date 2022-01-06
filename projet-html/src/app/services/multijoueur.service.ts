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
	playerNames:string[];
	tabOperations:any[]=[];

	constructor(private connexionService : ConnexionService, private router : Router) {

		this.mySocket = this.connexionService.getSocket();
		this.match.next(false);
	}


	ConnectToGame1(){
		this.mySocket.emit("jeu1", this.connexionService.getUser());
		this.mySocket.on("AddedToGame1",() =>{
			this.router.navigate(["/multijoueur-lobby"]);
		});
		this.mySocket.on("roomReady1", (roomId:string, players:string[], playerNames:string[], tabOperations:any[]) =>{
			this.match.next(true);
			this.roomId = roomId ;
			this.players = players;
			this.playerNames = playerNames;
			this.tabOperations = tabOperations;
			setTimeout(()=>{
				
				this.router.navigate(["/multijeu1"]);
			},2000);
		});
	}

	ConnectToGame2(){
		this.mySocket.emit("jeu2");
		this.mySocket.on("AddedToGame2",() =>{
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

	getPlayerNames(){
		return this.playerNames;
	}

	getTabOperations(){
		return this.tabOperations;
	}

	endGame(roomId:string,victory:boolean,gameNumber:number){
		
		this.match.next(false);
		this.match.complete();
		this.players = [];
		this.playerNames = [];
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
		this.mySocket.emit("leaveRoom", this.roomId);
		this.router.navigate(["/multijoueur"]);
	}
}