import { Component, OnInit } from '@angular/core';
import { PicrossService } from "../services/picross.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-picross',
  templateUrl: './picross.component.html',
  styleUrls: ['./picross.component.css']
})
export class PicrossComponent implements OnInit {
  /*
	[1,0,1,0,0,1,1,1,0,0,1,1,1,0,1,0,1,1,1,1,0,1,1,1,0];	
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	5
	[[1,1],[3],[3,1],[4],[3]];
	[[3],[4],[5],[2],[2]];
  */
  solution:any;
  state:any;	 

  taille:number;

  lignes:any;
  colonnes:any; 

  gameWon:boolean = false;

  dataLoaded: boolean = false;

  constructor(private picrossService: PicrossService, private router: Router) { }

  ngOnInit(): void {

  	

  }

  onStateChange(i:number, j:number){

  	if(!this.gameWon){
  		var ma_case = document.getElementById("case_"+i.toString()+"_"+j.toString());
	  	this.state[i*this.taille+j] = (this.state[i*this.taille+j]+1)%3;
	  	
		var currentState = this.state[i*this.taille+j];

		this.verifLigne(i);
		this.verifColonne(j);

	  	switch (currentState) {
	  		case 0:
	  			ma_case!.classList.remove("croix");
	  			break;
	  		case 1:
	  			ma_case!.classList.add("black");
	  			if(this.isGameWon()){
			  		this.gameWon = true;
			  		this.finDePartie();
			  	}
	  			break;
	  		case 2:
	  			ma_case!.classList.remove("black");
	  			ma_case!.classList.add("croix");
	  			break;
	  		default:
	  			// code...
	  			break;
	  	}
  	}
  	
  	
 	

  }

  verifLigne(ligne_i:number){
  	var ligne=[];
  	for (var i = ligne_i*this.taille; i < ligne_i*this.taille+this.taille; ++i) {
  		ligne.push(this.state[i]);
  	}
  	var tab_chiffres = this.liste_etat_to_draw(ligne);
  	var ligne_a_modif = document.getElementById("ligne_"+ligne_i);
  	if(this.arrayEquals(tab_chiffres,this.lignes[ligne_i])){
  		console.log("ligne OK");
  		
  		ligne_a_modif!.classList.add("termine");
  	}
  	else{
  		ligne_a_modif!.classList.remove("termine");
  	}
  }

  verifColonne(colonne_j:number){
  	var colonne=[];
  	for (var j = 0; j < this.taille; ++j) {
  		colonne.push(this.state[j*this.taille + colonne_j]);
  	}
  	var tab_chiffres = this.liste_etat_to_draw(colonne);
  	var colonne_a_modif = document.getElementById("colonne_"+colonne_j);
  	if(this.arrayEquals(tab_chiffres,this.colonnes[colonne_j])){
  		console.log("colonne OK");
  		colonne_a_modif!.classList.add("termine");
  	}
  	else{
  		colonne_a_modif!.classList.remove("termine");
  	}
  }

  isGameWon(){
  	var won = true;
  	for (var i = 0; i < this.solution.length; ++i) {
  		if(this.solution[i]==1&&this.state[i]!=1 || this.solution[i]==0&& this.state[i]==1){
  			won = false;
  		}
  	}
  	return won
  }

  finDePartie(){
  	for (var i = 0; i < this.state.length; ++i) {
  		if(this.state[i]==2){
  			this.state[i]=0;
  			var col = i%this.taille;
  			var li = Math.floor(i/this.taille);
  			var ma_case = document.getElementById("case_"+li.toString()+"_"+col.toString());
  			ma_case!.classList.remove("croix");

  		}
  	}
  }

  liste_etat_to_draw(tab:any){
  	var compteur = 0;
  	var draw = []
  	while(compteur < this.taille){
  		if(tab[compteur]==1){
  			var count = 0;
  			while(tab[compteur]==1 && compteur < this.taille){
  				count++
  				compteur++
  			}
  			draw.push(count);

  		}
  		else{
  			compteur++
  		}
  	}
  	return(draw)
  }

  arrayEquals(a:any, b:any) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
	}

  onLoadData(difficulte:number){
  	switch (difficulte) {
  		case 0:
  			var data = this.picrossService.getPicrossLVL1();
  			break;
  		case 1:
  			var data = this.picrossService.getPicrossLVL2();
  			break;
  		case 2:
  			var data = this.picrossService.getPicrossLVL3();
  			break;	
  		default:
  			var data = this.picrossService.getPicrossLVL1();
  			break;
  	}

  	this.solution = data.solution;
  	this.state = data.state;
  	this.lignes = data.lignes;
  	this.colonnes = data.colonnes;
  	this.taille = data.taille;
  	this.dataLoaded = true;
  }

  onRetourMenu(){
  	this.router.navigate(['/aventure']);
  }

}