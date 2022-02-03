import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConnexionService } from '../services/connexion.service';
import { LocalStorageService } from '../services/localStorage.service';

@Component({
  selector: 'app-connexion-menu',
  templateUrl: './connexion-menu.component.html',
  styleUrls: ['./connexion-menu.component.css']
})
export class ConnexionMenuComponent implements OnInit {

	public UserForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private connexionService:ConnexionService, private router:Router, private localStorage: LocalStorageService) {
  	  	this.UserForm = this.formBuilder.group({
	      name: [''],
	      password: ['']
	    }) 

   }

  ngOnInit(): void {
    console.log(this.connexionService.getAuth());
  }


    //Connexion de l'utilisateur + ajout dynamique de 'not found' en cas d'identifiants invalides
  onSubmit(){
  	this.connexionService.signIn(this.UserForm.value).then((response) => {
		if(response){
			this.router.navigate(['/main']);
		}
    else{
      this.UserForm= this.formBuilder.group({
	      name: [''],
	      password: ['']
	    }) ;
      alert("Aucun compte correspondant à ces identifiants n'a été trouvé.");
    }
	});
  }

}
