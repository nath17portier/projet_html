import { Component, OnInit } from '@angular/core';
import { PicrossService } from "../services/picross.service";
import { LocalStorageService } from '../services/localStorage.service';
import { Router } from "@angular/router";
import { ConnexionService } from '../services/connexion.service';

@Component({
  selector: 'app-picross',
  templateUrl: './picross.component.html',
  styleUrls: ['./picross.component.css']
})
export class PicrossComponent implements OnInit {

  solution:any;
  state:any;	 

  taille:number;

  lignes:any;
  colonnes:any; 

  gameWon:boolean = false;

  dataLoaded: boolean = false;

  lvlMax:number;
  difficulte:number;

  niveau:number = 2;

  toolTipLvl2 = false;

  toolTipLvl3 = false;

  constructor(private connexionService : ConnexionService,private picrossService: PicrossService, private router: Router, private localStorageService : LocalStorageService) { }

  ngOnInit(): void {
  	this.lvlMax = this.localStorageService.get("lvlPicross");
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
  	if(this.lvlMax==this.difficulte && this.lvlMax!=3){
  		this.picrossService.lvlUpPicross(this.lvlMax);
		this.lvlMax+=1;
  	}
  	if(this.localStorageService.get("lvlGeneral")==this.niveau){
  		this.connexionService.lvlUpGeneral(this.niveau);
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
  	this.difficulte = difficulte+1;
  	switch (difficulte) {
  		case 0:
  			var data = this.clone(this.picrossService.getPicrossLVL1());
  			break;
  		case 1:
  			var data = this.clone(this.picrossService.getPicrossLVL2());
  			break;
  		case 2:
  			var data = this.clone(this.picrossService.getPicrossLVL3());
  			break;	
  		default:
  			var data = this.clone(this.picrossService.getPicrossLVL1());
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

  onReplay(){
	  this.dataLoaded = false;
	  this.gameWon = false;
  }


  onTooltipLvl2(){
    this.toolTipLvl2 = true;
  }

  outTooltipLvl2(){
    this.toolTipLvl2 = false;
  }

  onTooltipLvl3(){
    this.toolTipLvl3 = true;
  }

  outTooltipLvl3(){
    this.toolTipLvl3 = false;
  }

  clone(obj:any){
    try{
      var copy = JSON.parse(JSON.stringify(obj));
    } catch(ex){
      alert(ex);
    }
    return copy;
  }

}