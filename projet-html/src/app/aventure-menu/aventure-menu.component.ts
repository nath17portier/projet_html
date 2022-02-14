import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localStorage.service';

@Component({
  selector: 'app-aventure-menu',
  templateUrl: './aventure-menu.component.html',
  styleUrls: ['./aventure-menu.component.css']
})
export class AventureMenuComponent implements OnInit {

  displayTooltipRushHour:boolean = false;
  displayTooltipPicross:boolean = false;

  constructor(private localStorageService : LocalStorageService) { }

  public lvl = this.localStorageService.get("lvlGeneral");

  ngOnInit(): void {
  }

  onPicross(){
  	this.displayTooltipPicross = true;
  }

  outPicross(){
  	this.displayTooltipPicross = false;
  }

  onRushHour(){
  	this.displayTooltipRushHour = true;
  }

  outRushHour(){
  	this.displayTooltipRushHour = false;
  }


}
