import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-inscription-menu',
  templateUrl: './inscription-menu.component.html',
  styleUrls: ['./inscription-menu.component.css']
})
export class InscriptionMenuComponent implements OnInit {

	public userForm: FormGroup;

  constructor(
    public connexionService: ConnexionService, public formBuilder: FormBuilder, public router: Router) { 
    this.userForm = this.formBuilder.group({
      name: [''],
      password: [''],    
    })      
  }

  ngOnInit(): void {
  	
  }

  onSubmit(){
  	this.connexionService.createUser(this.userForm.value).then((reponse:boolean)=>{
  		if(reponse){
  			console.log("ca a marché");
  			this.router.navigate(['/connexion']); 
  		}
  		else{
  			console.log("username deja utilisé");
  		}
  	});
    
  }

}
