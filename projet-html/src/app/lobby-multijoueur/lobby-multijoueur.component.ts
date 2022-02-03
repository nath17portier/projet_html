import { Component, OnInit } from '@angular/core';
import { MultijoueurService } from '../services/multijoueur.service';
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-lobby-multijoueur',
  templateUrl: './lobby-multijoueur.component.html',
  styleUrls: ['./lobby-multijoueur.component.css']
})
export class LobbyMultijoueurComponent implements OnInit {

	match:boolean = false;
  sub: Subscription;

  constructor(private multijoueurService : MultijoueurService, private router: Router) { }

  ngOnInit(): void {
     

  	 this.sub = this.multijoueurService.getMatch().subscribe(
  		(m: any) =>{
  			this.match = m;
  		}
  	);

  }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }

  onRetourMenu(){
    
    this.multijoueurService.undoMatch();
    this.router.navigate(['/multijoueur']);
  }


}
