import { Component, OnInit } from '@angular/core';
import { MultijoueurService } from '../services/multijoueur.service';

@Component({
  selector: 'app-multijoueur-menu',
  templateUrl: './multijoueur-menu.component.html',
  styleUrls: ['./multijoueur-menu.component.css']
})
export class MultijoueurMenuComponent implements OnInit {

  constructor(private multijoueurService : MultijoueurService) { }

  ngOnInit(): void {
  }

  onClick(){
  	console.log("test");
  }

}
