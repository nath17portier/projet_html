import { Component, OnInit } from '@angular/core';
import { MultijoueurService } from '../services/multijoueur.service';
import { ConnexionService } from '../services/connexion.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-jeu-multi-un',
  templateUrl: './jeu-multi-un.component.html',
  styleUrls: ['./jeu-multi-un.component.css']
})
export class JeuMultiUnComponent implements OnInit {

	roomId:string = "";
	Score_Joueur_1:number = 0;
	Score_Joueur_2:number = 0;
	mySocket:Socket;
	pointsMax:number = 3;
	ecranFin = false;
	winner =0;
	wonGame = false;
	players :string[];

  constructor(private multijoueurService: MultijoueurService, private connexionService : ConnexionService) {
  	this.mySocket = this.connexionService.getSocket();
  }

  ngOnInit(): void {
	this.roomId = this.multijoueurService.getRoomId();
	this.players = this.multijoueurService.getPlayers();


	this.mySocket.on("player1Scored",()=>{
		this.Score_Joueur_1+=1;
		if(this.Score_Joueur_1>=this.pointsMax){
			this.wonGame = true;
			this.finDePartie(0);
		}
	})

	this.mySocket.on("player2Scored",()=>{
		this.Score_Joueur_2+=1;
		if(this.Score_Joueur_2>=this.pointsMax){
			this.finDePartie(1);
		}
	})
  }

  onPlayer1Scored(){
  	this.mySocket.emit("player1Scored",this.roomId);
  }

  onPlayer2Scored(){
  	this.mySocket.emit("player2Scored",this.roomId);
  }

  finDePartie(joueur:number){
  	console.log(joueur +" a gagné");
  	this.ecranFin = true;
  	this.winner = joueur;
  	/*if(this.connexionService.getPseudo() == this.players[joueur]){
  		this.wonGame = true;
  	}*/
  	setTimeout(()=>{
		this.multijoueurService.endGame(this.roomId,this.wonGame,1);
	},2000);
  }

}
