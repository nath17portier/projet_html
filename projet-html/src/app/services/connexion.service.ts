import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LocalStorageService } from '../services/localStorage.service';
import * as CryptoJS from 'crypto-js';


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

  getLvl(){
    return this.localStorageService.get('lvlGeneral');
  }



  //todo : hash le mdp avant de le recuperer
  async signIn(usr:any){
    return new Promise(
      (resolve, reject) => {
    var name = usr.name;
    var pass = usr.password;

    var passSafe = this.set("password", pass);
    
    this.socket.emit("connectRequest",name,passSafe);
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
    var name = user.name;
    var pass = user.password;

    var passSafe = this.set("password", pass);

    return new Promise<any>((resolve, reject) => {
      this.socket.emit("inscription",name,passSafe);
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

  set(keys:any, value:any){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

}