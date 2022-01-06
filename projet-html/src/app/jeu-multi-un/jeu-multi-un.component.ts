import { Component, OnInit, OnDestroy } from '@angular/core';
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
	pointsMax:number = 10;
	ecranFin = false;
	winner = "";
	wonGame = false;
	players :string[];
	playerNames :string[];
	tabOperations:any[];

	joueur1:boolean;
	joueur2:boolean;

  constructor(private multijoueurService: MultijoueurService, private connexionService : ConnexionService) {
  	this.mySocket = this.connexionService.getSocket();
  }

  ngOnInit(): void {

	this.roomId = this.multijoueurService.getRoomId();
	this.players = this.multijoueurService.getPlayers();
	this.playerNames = this.multijoueurService.getPlayerNames();
	this.tabOperations = this.multijoueurService.getTabOperations();

	console.log(this.tabOperations);

	if(this.playerNames[0]==this.connexionService.getUser()){
		this.joueur1=true;
		this.joueur2=false;
	}
	else{
		this.joueur1=false;
		this.joueur2=true;
	}

	this.mySocket.on("player1Scored",(roomId:string)=>{
		if(roomId==this.roomId){
			this.Score_Joueur_1+=1;
			if(this.Score_Joueur_1==this.pointsMax){

				this.finDePartie(0);
			}
		}
		
	})

	this.mySocket.on("player2Scored",(roomId:string)=>{
		if(roomId==this.roomId){
			this.Score_Joueur_2+=1;
			if(this.Score_Joueur_2==this.pointsMax){

				this.finDePartie(1);
			}
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
  	console.log(this.roomId);
  	this.ecranFin = true;
  	this.winner = this.playerNames[joueur];
  	if(this.connexionService.getUser() == this.playerNames[joueur]){
  		this.wonGame = true;
  		console.log("gagné");
  	}
  	setTimeout(()=>{
		this.multijoueurService.endGame(this.roomId,this.wonGame,1);
	},2000);
  }


  updateResponse1(){
  	var input = (<HTMLInputElement>document.getElementById("input_joueur1"))!;
  	var resp = input.value
  	console.log(resp);
  	console.log(this.tabOperations[this.Score_Joueur_1].result);
  	if(resp==this.tabOperations[this.Score_Joueur_1].result){
  		this.onPlayer1Scored();

  	}
  	input.value = "";
  }

  updateResponse2(){
  	var input = (<HTMLInputElement>document.getElementById("input_joueur2"))!;
  	var resp = input.value
  	console.log(resp);
  	console.log(this.tabOperations[this.Score_Joueur_2].result);
  	if(resp==this.tabOperations[this.Score_Joueur_2].result){
  		this.onPlayer2Scored();
  		
  	}
  	input.value = "";
  }



  ngOnDestroy(): void{
  	this.Score_Joueur_1 = 0;
	this.Score_Joueur_2 = 0;
	this.wonGame = false;
  }


}
