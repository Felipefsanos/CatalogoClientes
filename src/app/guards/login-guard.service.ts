import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {UserService} from "../Services/base/user.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{

  constructor(private userService: UserService, private  router: Router) { }

	canActivate(): boolean{
		const user = this.userService.getUser();
		if (user == null || user.token.expirationDate <= new Date()){
			this.router.navigateByUrl('/login');
			return false;
		}
		return true;
	}
}

