import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})

export class MultijoueurService {

	constructor(private socket : Socket) {}

	test(){
		console.log(this.socket);
	}

}