import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})

export class ConnexionService {

	constructor(private socket : Socket) {}

	getSocket(){
		return (this.socket);
	}

}