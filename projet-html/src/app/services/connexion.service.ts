import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LocalStorageService } from '../services/localStorage.service';


@Injectable({
  providedIn: 'root'
})

export class ConnexionService {

	constructor(private socket:Socket,private localStorageService : LocalStorageService) {

		
	}


	getSocket(){
	return (this.socket);
  }

	getUser(){
    return this.localStorageService.get('user');
  }

  getAuth(){
    return this.localStorageService.get('isAuth');
  }

  //todo : hash le mdp avant de le recuperer
  async signIn(usr:any){
    return new Promise(
      (resolve, reject) => {
    var name = usr.name;
    var pass = usr.password;
    
    this.socket.emit("connectRequest",name,pass);
    this.socket.on("connectResult",(response:boolean)=>{
    	console.log("a + ",response);
      if(response){
        this.localStorageService.set("isAuth",true);
        this.localStorageService.set("pseudo",name);
        resolve(true);
      }
      else{
        resolve(false);
      }
    });
  })
  }

  signOut(){
    this.localStorageService.remove('pseudo');
    this.localStorageService.set('isAuth',false);
  }

    //Création d'un user
  async createUser(user: any) {
    console.log(user);
    var name = user.name;
    var pass = user.password;
    return new Promise<any>((resolve, reject) => {
      this.socket.emit("inscription",name,pass);
      this.socket.on("inscriptionResult",(response:boolean)=>{
      	if(response){
      		resolve(true);
      	}
      	else{
      		resolve(false);
      	}
      })
  })
}

}