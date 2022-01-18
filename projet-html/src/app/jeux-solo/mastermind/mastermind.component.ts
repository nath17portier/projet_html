import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mastermind',
  templateUrl: './mastermind.component.html',
  styleUrls: ['./mastermind.component.css']
})
export class MastermindComponent implements OnInit {

  listeCouleurs = ["purple", "blue", "green", "yellow", "red", "pink"];
  code = ["", "", "", ""];
  firstEmptyPuce = 0;
  listeTentatives: any = [];
  listeResultats: any = [];
  submittedCode: string[] = ["", "", "", ""];
  emptyPuces: number[] = [1, 2, 3, 4];
  submittedResult: string[] = [];
  fb: FormBuilder = new FormBuilder;
  won = false;
  lost = false;
  formCouleurs: any;

  constructor() { }

  ngOnInit(): void {
    this.creerCode();
    this.formCouleurs = this.fb.group({
      couleur1: new FormControl(null, Validators.required),
      couleur2: new FormControl(null, Validators.required),
      couleur3: new FormControl(null, Validators.required),
      couleur4: new FormControl(null, Validators.required),
    });
  }

  onSubmit(): void {
    this.listeTentatives.push(this.submittedCode);
    this.firstEmptyPuce = 0;
    this.emptyForm();
    this.checkGameWon();
  }

  creerCode(): void {
    for (var i = 0; i < 4; i++) {
      this.code[i] = this.listeCouleurs[this.getRandomInt(this.listeCouleurs.length)];
    }
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  checkGameWon(): void {
    var gameWon = true;
    this.checkCode();
    for (var i = 0; i < this.code.length; i++) {
      if (this.code[i] !== this.listeTentatives[this.listeTentatives.length - 1][i]) {
        gameWon = false;
        if (this.listeTentatives.length == 10) {
          this.lost = true;
        }
        break;
      }
    }
    this.submittedCode = ["", "", "", ""];
    this.won = gameWon;
  }

  checkCode(): void {
    this.submittedResult = [];
    var noir: number[] = [];
    var codeJson = this.codeJsonConverter(this.code);
    var codeSubJson = this.codeJsonConverter(this.submittedCode);
    Object.entries(codeSubJson).forEach((property: any) => {
      if (codeJson.hasOwnProperty(property[0])) {
        property[1].forEach((c: any) => {
          codeJson[property[0]].forEach((cs: any) => {
            if (c == cs) {
              this.submittedResult.push("ColorOkPlaceOk");
              noir.push(c);
            }
          });
        });
        noir.forEach(p => {
          if (property[1].includes(p)) {
            property[1].splice(property[1].indexOf(p), 1);
          }
          if (codeJson[property[0]].includes(p)) {
            codeJson[property[0]].splice(codeJson[property[0]].indexOf(p), 1);
          }
        });
        if (property[1].length > 0 && codeJson[property[0]].length > 0) {
          var max = Math.min(property[1].length, codeJson[property[0]].length);
          for (var i = 0; i < max; i++)
            this.submittedResult.push("ColorOkPlacePOk");
          property[1].splice(0, 1);
          codeJson[property[0]].splice(0, 1);
        }
        if (property[1].length > 0) {
          property[1].forEach((c: any) => {
            this.submittedResult.push("None");
          });
        }
      }
      else {
        property[1].forEach((c: any) => {
          this.submittedResult.push("None");
        });
      }
    });
    this.submittedResult.sort();
    this.listeResultats.push(this.submittedResult);
  }

  codeJsonConverter(code: string[]): any {
    var codeJson: any = {};
    var i = 0;
    code.forEach(c => {
      if (codeJson.hasOwnProperty(c)) {
        codeJson[c].push(i);
      }
      else {
        codeJson[c] = [i];
      }
      i++;
    });
    return codeJson;
  }

  putColor(color: string): void {
    switch (this.firstEmptyPuce) {
      case 0:
        this.formCouleurs.controls.couleur1.setValue(color);
        break;
      case 1:
        this.formCouleurs.controls.couleur2.setValue(color);
        break;
      case 2:
        this.formCouleurs.controls.couleur3.setValue(color);
        break;
      case 3:
        this.formCouleurs.controls.couleur4.setValue(color);
        break;
      default:
        break;
    }
    if (this.firstEmptyPuce < 4) {
      this.submittedCode[this.firstEmptyPuce] = color;
    }
    this.updateFirstEmpty();
  }

  removeColor(i: number): void {
    switch (i) {
      case 0:
        this.formCouleurs.controls.couleur1.setValue(null);
        break;
      case 1:
        this.formCouleurs.controls.couleur2.setValue(null);
        break;
      case 2:
        this.formCouleurs.controls.couleur3.setValue(null);
        break;
      case 3:
        this.formCouleurs.controls.couleur4.setValue(null);
        break;
      default:
        break;
    }
    this.submittedCode[i] = "";
    this.updateFirstEmpty();
  }

  updateFirstEmpty(): void {
    for (var i = 0; i < this.submittedCode.length; i++) {
      if (this.submittedCode[i] == "") {
        this.firstEmptyPuce = i;
        break;
      }
    }
  }

  resetGame(): void {
    this.firstEmptyPuce = 0;
    this.emptyForm();
    this.listeResultats = [];
    this.listeTentatives = [];
    this.won = false;
    this.lost = false;
    this.creerCode();
  }

  emptyForm(): void {
    this.formCouleurs.controls.couleur1.setValue(null);
    this.formCouleurs.controls.couleur2.setValue(null);
    this.formCouleurs.controls.couleur3.setValue(null);
    this.formCouleurs.controls.couleur4.setValue(null);
  }
}