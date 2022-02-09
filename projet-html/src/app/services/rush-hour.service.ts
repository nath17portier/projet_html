import { Injectable } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import { LocalStorageService } from '../services/localStorage.service';


@Injectable({
  providedIn: 'root'
})

export class RushHourService {


	tabLevels = [{tabVoiture: [	{ taille:2, coordonnee:[2,1], orientation:"H"}, 
		                        { taille:2, coordonnee:[0,0], orientation:"H"},
		                        { taille:3, coordonnee:[1,0], orientation:"V"},
		                        { taille:2, coordonnee:[4,0], orientation:"V"},
		                        { taille:3, coordonnee:[1,3], orientation:"V"},
		                        { taille:3, coordonnee:[0,5], orientation:"V"},
		                        { taille:2, coordonnee:[4,4], orientation:"H"},
		                        { taille:3, coordonnee:[5,2], orientation:"H"}
                      ], parkingSpace: [[2,2,0,0,0,6],
                      					[3,0,0,5,0,6],
                      					[3,1,1,5,0,6],
                      					[3,0,0,5,0,0],
                      					[4,0,0,0,7,7],
                      					[4,0,8,8,8,0]] },


                      {tabVoiture: [	{ taille:2, coordonnee:[2,0], orientation:"H"}, 
				                        { taille:2, coordonnee:[0,0], orientation:"V"},
				                        { taille:3, coordonnee:[0,3], orientation:"H"},
				                        { taille:2, coordonnee:[1,3], orientation:"V"},
				                        { taille:2, coordonnee:[2,4], orientation:"V"},
				                        { taille:3, coordonnee:[1,5], orientation:"V"},
				                        { taille:2, coordonnee:[4,4], orientation:"H"},
				                        { taille:2, coordonnee:[5,3], orientation:"H"},
				                        { taille:3, coordonnee:[3,0], orientation:"H"},
				                        { taille:2, coordonnee:[4,2], orientation:"V"},
				                        { taille:2, coordonnee:[5,0], orientation:"H"}
                      ], parkingSpace: [[2,0,0,3,3,3],
                      					[2,0,0,4,0,6],
                      					[1,1,0,4,5,6],
                      					[9,9,9,0,5,6],
                      					[0,0,10,0,7,7],
                      					[11,11,10,8,8,0]], },

                 {tabVoiture: [	{ taille:2, coordonnee:[2,1], orientation:"H"}, 
		                        { taille:3, coordonnee:[2,3], orientation:"V"},
		                        { taille:3, coordonnee:[3,5], orientation:"V"},
		                        { taille:2, coordonnee:[3,1], orientation:"H"},
		                        { taille:2, coordonnee:[4,1], orientation:"V"},
		                        { taille:2, coordonnee:[5,2], orientation:"H"}

                      ], parkingSpace: [[0,0,0,0,0,0],
                      					[0,0,0,0,0,0],
                      					[0,1,1,2,0,0],
                      					[0,4,4,2,0,3],
                      					[0,5,0,2,0,3],
                      					[0,5,6,6,0,3]] },

                {tabVoiture: [	{ taille:2, coordonnee:[2,1], orientation:"H"}, 
		                        { taille:3, coordonnee:[0,0], orientation:"V"},
		                        { taille:3, coordonnee:[0,3], orientation:"V"},
		                        { taille:2, coordonnee:[3,2], orientation:"V"},
		                        { taille:3, coordonnee:[3,3], orientation:"H"},
		                        { taille:2, coordonnee:[4,5], orientation:"V"},
		                        { taille:3, coordonnee:[5,2], orientation:"H"}

                      ], parkingSpace: [[2,0,0,3,0,0],
                      					[2,0,0,3,0,0],
                      					[2,1,1,3,0,0],
                      					[0,0,4,5,5,5],
                      					[0,0,4,0,0,6],
                      					[0,0,7,7,7,6]] }
];
	
	constructor(private connexionService : ConnexionService, private localStorageService : LocalStorageService) {
	}

	/*[{numero:1, taille:2, coordonnee:[3,0], orientation:"H"}, 
                        {numero:2, taille:3, coordonnee:[0,1], orientation:"H"},
                        {numero:3, taille:1, coordonnee:[1,0], orientation:"V"},
                        {numero:4, taille:2, coordonnee:[1,1], orientation:"H"},
                        {numero:5, taille:3, coordonnee:[1,3], orientation:"V"},
                        {numero:6, taille:2, coordonnee:[2,2], orientation:"V"}
                      ];*/

    //[[0,2,2,2],[3,4,4,5],[0,0,6,5],[1,1,6,5]];

	getRushHourLevel(){
		var i = Math.floor(Math.random() * this.tabLevels.length);
		return {
			tabVoiture : this.tabLevels[i].tabVoiture,
			parkingSpace : this.tabLevels[i].parkingSpace
		}
	}




}