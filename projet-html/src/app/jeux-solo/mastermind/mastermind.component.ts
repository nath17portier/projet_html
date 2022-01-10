import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mastermind',
  templateUrl: './mastermind.component.html',
  styleUrls: ['./mastermind.component.css']
})
export class MastermindComponent implements OnInit {

  listeCouleurs = ["purple","blue", "green", "yellow", "red", "pink"];
  code =["","","",""];
  listeTentatives: any = [];
  listeResultats: any = [];
  submittedCode: string[] = [];
  submittedResult: string[] = [];
  fb: FormBuilder = new FormBuilder;
  won=false;
  lost=false;
  formCouleurs: any;

  constructor() { }

  ngOnInit(): void {
    this.creerCode();
    this.formCouleurs= this.fb.group({
      couleur1: new FormControl("", Validators.required) ,
      couleur2: new FormControl("", Validators.required) ,
      couleur3: new FormControl("", Validators.required) ,
      couleur4: new FormControl("", Validators.required) ,
   });
  }

  onSubmit(): void{
    this.submittedCode = [];
    this.submittedCode.push(this.formCouleurs.controls.couleur1.value);
    this.submittedCode.push(this.formCouleurs.controls.couleur2.value);
    this.submittedCode.push(this.formCouleurs.controls.couleur3.value);
    this.submittedCode.push(this.formCouleurs.controls.couleur4.value);
    this.listeTentatives.push(this.submittedCode);
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
    this.checkCode();
    for(var i=0; i<this.code.length; i++){
      if(this.code[i] !== this.listeTentatives[this.listeTentatives.length-1][i]){
        gameWon=false;
        if(this.listeTentatives.length==10){
          this.lost=true;
        }
        break;
      }
    }
    this.won=gameWon;
  }

  checkCode():void{
    this.submittedResult = [];
    var codeJson = this.codeJsonConverter(this.code);
    var codeSubJson = this.codeJsonConverter(this.submittedCode);
    Object.entries(codeJson).forEach((property: any) => {
      if(codeSubJson.hasOwnProperty(property[0])){
        property[1].forEach((c: any) => {
          if(codeSubJson[property[0]].includes(c)){
            this.submittedResult.push("ColorOkPlaceOk");
          }
          else{
            this.submittedResult.push("ColorOkPlacePOk");
          }
        });
      }
      else{
        property[1].forEach((c: any) => {
          this.submittedResult.push("None");
        });
      }
    });
    this.submittedResult.sort();
    this.listeResultats.push(this.submittedResult);
    console.log(this.listeResultats);
  }

  codeJsonConverter(code: string[]):any{
    var codeJson:any = {};
    var i =0;
    code.forEach(c => {
      if(codeJson.hasOwnProperty(c)){
        codeJson[c].push(i);
      }
      else{
        codeJson[c]=[i];
      }
      i++;
    });
    return codeJson;
  }
}