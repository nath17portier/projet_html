import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from "@angular/router";
import { Observable } from	"rxjs/Observable";
import { Injectable } from "@angular/core";
import { ConnexionService } from "./connexion.service"

@Injectable({
  providedIn: 'root'
})
export class PicrossGuardService implements CanActivate{

	constructor(private authservice: ConnexionService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean{

		if (this.authservice.getLvl() >= 2) {
			return(true);
		}
		else{
			this.router.navigate(['/aventure']);
			return(false);
		}

	}
}