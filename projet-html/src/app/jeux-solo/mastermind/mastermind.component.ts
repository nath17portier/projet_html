import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mastermind',
  templateUrl: './mastermind.component.html',
  styleUrls: ['./mastermind.component.css']
})
export class MastermindComponent implements OnInit {

  listeCouleurs = ["yellow", "blue", "red", "orange", "pink", "purple"];
  code =["","","",""];
  couleursChoisies =["","","",""];
  currentColorIdx =0;
  won=false;

  constructor() { }

  ngOnInit(): void {
    this.creerCode();
  }

  getColor(color:string): void {
    if(this.currentColorIdx==0){
      this.couleursChoisies=["","","",""];
    }
    console.log(color);
    this.couleursChoisies[this.currentColorIdx]=color;
    this.currentColorIdx++;
    if(this.currentColorIdx==4){
      this.currentColorIdx=0;
    }
    this.checkGameWon();
  }

  creerCode():void {
    for(var i=0; i<4; i++){
      this.code[i]=this.listeCouleurs[this.getRandomInt(this.listeCouleurs.length)];
    }
  }

  getRandomInt(max : number){
    return Math.floor(Math.random() * max);
  }

  checkGameWon():void{
    var gameWon=true;
    for(var i=0; i<this.code.length; i++){
      if(this.code[i] !== this.couleursChoisies[i]){
        gameWon=false;
        break;
      }
    }
    this.won=gameWon;
  }
}
