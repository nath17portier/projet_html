import { Component, OnInit } from '@angular/core';
import { MultijoueurService } from '../services/multijoueur.service';

@Component({
  selector: 'app-lobby-multijoueur',
  templateUrl: './lobby-multijoueur.component.html',
  styleUrls: ['./lobby-multijoueur.component.css']
})
export class LobbyMultijoueurComponent implements OnInit {

	match:boolean = false;

  constructor(private multijoueurService : MultijoueurService) { }

  ngOnInit(): void {

  	this.multijoueurService.getMatch().subscribe(
  		(m: any) =>{
  			this.match = m;
  			console.log(this.match);
  		}
  	);

  }

}
