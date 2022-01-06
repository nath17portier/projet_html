import { Component, OnInit } from '@angular/core';
import { MultijoueurService } from '../services/multijoueur.service';

@Component({
  selector: 'app-multijoueur-menu',
  templateUrl: './multijoueur-menu.component.html',
  styleUrls: ['./multijoueur-menu.component.css']
})
export class MultijoueurMenuComponent implements OnInit {

  canUse:boolean  = true;


  constructor(private multijoueurService : MultijoueurService) { 

  }

  ngOnInit(): void {
  }

  onGame1(){
    this.canUse  = false;
    this.multijoueurService.ConnectToGame1();
  }

  onGame2(){
    this.canUse  = false;
    this.multijoueurService.ConnectToGame2();

   }

}
