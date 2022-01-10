import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PicrossService {

	picrossLVL1 = [{lignes:[[1,1],[3],[3,1],[4],[3]], colonnes: [[3],[4],[5],[2],[2]], solution: [1,0,1,0,0,1,1,1,0,0,1,1,1,0,1,0,1,1,1,1,0,1,1,1,0]},
	{lignes:[[3],[1,2],[1,2],[1,1],[5]], colonnes: [[1,2],[1,1,1],[2,1],[3,1],[3]], solution: [0,1,1,1,0,1,0,1,1,0,0,1,0,1,1,1,0,0,0,1,1,1,1,1,1]}];
	picrossLVL2 = [{lignes:[[4],[3,1],[1,3],[4,1],[1,1],[1,3],[3,4],[4,4],[4,2],[2]], colonnes: [[2],[4],[4],[8],[1,1],[1,1],[1,1,2],[1,1,4],[1,1,4],[8]], solution: [0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,1,0,0,0,1,0,0,0,1,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,1,0,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0]}];
	picrossLVL3 = [{lignes:[[4],[7,1,1],[2,3,1],[1,3,1],[1,3,1,3],[3,2,2],[2,1,3],[2,1,2,2],[1,3,1,2],[1,2,2,1],[1,6,1],[2,1,1],[8,1],[2,1,1,2],[4,6]],
	 colonnes: [[4,2],[2,1,2,2],[1,2,1,1,1],[1,1,2,1,1],[1,1,1,1,1],[1,1,1,3,1,1],[1,1,1,2,1,1,1],[5,1,1,1,3],[1,1,1,1,1,1,1],[3,1,1,1,3],[1,1,1,2,1,1],[4,1,2,1],[1,2,2],[2,1],[6]],
	 solution: [0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,
	 			0,1,1,1,1,1,1,1,0,1,0,1,0,0,0,
	 			1,1,0,0,0,0,0,1,1,1,0,1,0,0,0,
	 			1,0,0,0,0,1,1,1,0,0,0,1,0,0,0,
	 			1,0,1,1,1,0,0,1,0,0,1,1,1,0,0,
	 			1,1,1,0,0,1,1,0,1,1,0,0,0,0,0,
	 			0,0,0,1,1,0,0,1,0,0,1,1,1,0,0,
	 			0,0,1,1,0,0,1,0,1,1,0,0,1,1,0,
	 			0,1,0,0,0,1,1,1,0,0,0,1,0,1,1,
	 			0,1,0,0,1,1,0,0,0,0,1,1,0,0,1,
	 			0,0,1,0,0,1,1,1,1,1,1,0,0,0,1,
	 			0,0,0,1,1,0,0,0,0,0,0,0,1,0,1,
	 			0,0,0,0,0,1,1,1,1,1,1,1,1,0,1,
	 			1,1,0,0,0,0,0,1,0,1,0,0,0,1,1,
	 			1,1,1,1,0,1,1,1,1,1,1,0,0,0,0]}];

	constructor() {

	}


	getPicrossLVL1(){
		var i = Math.floor(Math.random() * this.picrossLVL1.length);
		return {
			taille : 5,
			state : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			lignes : this.picrossLVL1[i].lignes,
			colonnes : this.picrossLVL1[i].colonnes,
			solution : this.picrossLVL1[i].solution
		}
	}

	getPicrossLVL2(){
		var i = Math.floor(Math.random() * this.getPicrossLVL2.length);
		return {
			taille : 10,
			state : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			lignes : this.picrossLVL2[i].lignes,
			colonnes : this.picrossLVL2[i].colonnes,
			solution : this.picrossLVL2[i].solution
		}
	}
	

	getPicrossLVL3(){
		var i = Math.floor(Math.random() * this.getPicrossLVL3.length);
		console.log(i);
		var state = [];
		for (var j = 0; j < 225; ++j) {
			state.push(0);
		}
		console.log(this.picrossLVL3[i]);
		return {
			taille : 15,
			state : state,
			lignes : this.picrossLVL3[i].lignes,
			colonnes : this.picrossLVL3[i].colonnes,
			solution : this.picrossLVL3[i].solution
		}
	}
}