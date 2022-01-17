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
    return this.localStorageService.get('pseudo');
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
    this.socket.on("connectResult",(response:boolean, lvlGeneral:number, lvlPicross:number, id:string)=>{
      if(response){
        this.localStorageService.set("isAuth",true);
        this.localStorageService.set("pseudo",name);
        this.localStorageService.set("lvlGeneral",lvlGeneral);
        this.localStorageService.set("lvlPicross",lvlPicross);
        this.localStorageService.set("id",id);
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

  lvlUpGeneral(lvl:number){
    this.localStorageService.set("lvlGeneral",lvl+1)
    this.socket.emit("lvlUpGeneral", lvl, this.localStorageService.get("id"));
  }

}