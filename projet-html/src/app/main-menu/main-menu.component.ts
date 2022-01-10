import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private connexionService: ConnexionService) { }

  ngOnInit(): void {
  }


  onDeconnexion(){
  	this.connexionService.signOut();
  }

}
