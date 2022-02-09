import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localStorage.service';
import { ConnexionService } from '../services/connexion.service';
import { Router } from '@angular/router';
import { RushHourService } from '../services/rush-hour.service';

@Component({
  selector: 'app-rush-hour',
  templateUrl: './rush-hour.component.html',
  styleUrls: ['./rush-hour.component.css']
})
export class RushHourComponent implements OnInit {

  parkingSpace:number[][];
  tabVoiture:any[];
  dimension:number = 6;
  vehicleBeginPart:number[];
  vehicleEndPart:number[];
  caseToGo:number[];
  caseToGoOut:number[];
  selectedCar:number = -1;
  finDePartie:boolean = false;
  niveau:number = 3;

  constructor(private localStorageService: LocalStorageService, private connexionService: ConnexionService, private router: Router, private rushHourService: RushHourService) {
  }

  ngOnInit(): void {

    var level = this.rushHourService.getRushHourLevel();

    this.tabVoiture =  level.tabVoiture;

    this.parkingSpace = level.parkingSpace;
  }

  showTab(){
    console.log(this.parkingSpace);
  }

  firstPiece(vehicleID:number){
    this.vehicleBeginPart = [];
    let find:boolean = false;
    for (var i = 0; i < this.dimension; i++) {
      for (var j = 0; j < this.dimension; j++){
        if(!find && this.parkingSpace[i][j] == vehicleID){
          this.vehicleBeginPart.push(i);
          this.vehicleBeginPart.push(j);
          find = true;
        }
      }
    }
  }

  lastPiece(vehicleID:number){
    this.vehicleEndPart = [];
    var idxI:number = -1;
    var idxJ:number = -1;
    for (var i = 0; i < this.dimension; i++) {
      for (var j = 0; j < this.dimension; j++){
        if(this.parkingSpace[i][j] == vehicleID){
          idxI=i;
          idxJ=j;
        }
      }
    }
    this.vehicleEndPart.push(idxI);
    this.vehicleEndPart.push(idxJ);
  }

  movePiece(moveChoice:string){
    var idxToGo;
    if(this.compatibilityOrientationMovement(moveChoice)){
      this.getCaseToChange(moveChoice);
      if(this.permissionToMove(this.caseToGo)){
        this.parkingSpace[this.caseToGoOut[0]][this.caseToGoOut[1]] = 0;
        this.parkingSpace[this.caseToGo[0]][this.caseToGo[1]] = this.selectedCar+1;
        switch(moveChoice){
          case "down":
            idxToGo = this.caseToGo[0]-this.tabVoiture[this.selectedCar].taille+1;
            this.tabVoiture[this.selectedCar].coordonnee = [idxToGo,this.caseToGo[1]];
            break;
          case "right":
            idxToGo = this.caseToGo[1]-this.tabVoiture[this.selectedCar].taille+1;
            this.tabVoiture[this.selectedCar].coordonnee = [this.caseToGo[0],idxToGo];
            break;
          case "up":
            this.tabVoiture[this.selectedCar].coordonnee = [this.caseToGo[0],this.caseToGo[1]];
            break;
          case "left":
            this.tabVoiture[this.selectedCar].coordonnee = [this.caseToGo[0],this.caseToGo[1]];
            break;
        }
      }
      this.OnFinish();
    }
  }

  getCaseToChange(moveChoice:string){
    this.caseToGo = [-1,-1];
    this.caseToGoOut = [-1,-1];
    var newPosition:number;
    this.firstPiece(this.selectedCar+1);
    this.lastPiece(this.selectedCar+1);
    switch(moveChoice){
      case "up":
        newPosition = this.vehicleBeginPart[0]-1;
        this.caseToGo[0] = newPosition;    
        this.caseToGo[1] = this.vehicleBeginPart[1];
        this.caseToGoOut[0] = this.vehicleEndPart[0];  
        this.caseToGoOut[1] = this.vehicleEndPart[1]; 
        break;
      case "down":
        newPosition = this.vehicleEndPart[0]+1;
        this.caseToGo[0] = newPosition;    
        this.caseToGo[1] = this.vehicleEndPart[1]; 
        this.caseToGoOut[0] = this.vehicleBeginPart[0];  
        this.caseToGoOut[1] = this.vehicleBeginPart[1];  
        break;
      case "left":
        newPosition = this.vehicleBeginPart[1]-1;
        this.caseToGo[0] = this.vehicleBeginPart[0];    
        this.caseToGo[1] = newPosition;  
        this.caseToGoOut[0] = this.vehicleEndPart[0];  
        this.caseToGoOut[1] = this.vehicleEndPart[1];
        break;
      case "right":
        newPosition = this.vehicleEndPart[1]+1;
        this.caseToGo[0] = this.vehicleEndPart[0];    
        this.caseToGo[1] = newPosition; 
        this.caseToGoOut[0] = this.vehicleBeginPart[0];  
        this.caseToGoOut[1] = this.vehicleBeginPart[1]; 
        break;
      default:
        break;
    }
  }

  compatibilityOrientationMovement(moveChoice:string){
    
    switch(this.tabVoiture[this.selectedCar].orientation){
      case "H":
        return moveChoice === "left" || moveChoice === "right";
        break;
      case "V":
        return moveChoice === "up" || moveChoice === "down";
        break;
      default:
        return false;
        break;
    }
  }

  permissionToMove(movementPlace:number[]){
    if (movementPlace[0] == -1 || movementPlace[1] == -1) {
      return false;
    }
    return (movementPlace[0] < this.dimension && movementPlace[1] < this.dimension && this.parkingSpace[movementPlace[0]][movementPlace[1]] == 0) || (this.selectedCar == 0 && movementPlace[0] == 2 && movementPlace[1] == 6);
  }

  onSelectionVoiture(i:number){
    if(!this.finDePartie){
      var current_voiture = document.getElementById("voiture_"+i);
      if(this.selectedCar != -1){
        var previous_voiture = document.getElementById("voiture_"+this.selectedCar);
        previous_voiture!.classList.remove("selected");
      }
      this.selectedCar = i;
      current_voiture!.classList.add("selected");
   }
  }

  onUp(){
    this.movePiece("up");
  }

  onDown(){
    this.movePiece("down");
  }

  onLeft(){
    this.movePiece("left");
  }

  onRight(){
    this.movePiece("right");
  }

  OnFinish(){
    //this.firstPiece(this.selectedCar+1);
    if(this.selectedCar == 0 && this.tabVoiture[0].coordonnee[0]==2 && this.tabVoiture[0].coordonnee[1]==5 ){
      this.finDePartie = true;
      this.selectedCar = -1;
      if(this.localStorageService.get("lvlGeneral")==this.niveau){
        this.connexionService.lvlUpGeneral(this.niveau);
      }
    }
  }

  onRetourMenu(){
    this.router.navigate(['/aventure']);
  }

  onReplay(){
    this.finDePartie = false;
    var level = this.rushHourService.getRushHourLevel();

    this.tabVoiture =  level.tabVoiture;

    this.parkingSpace = level.parkingSpace;
  }
  //faire un service pour niveaux random
}
