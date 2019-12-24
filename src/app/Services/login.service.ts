import {EventEmitter, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {BaseHttpService} from "./base/base-http.service";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./base/user.service";
import {Md5} from 'ts-md5/dist/md5';
import {Observable} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class LoginService extends BaseHttpService{

	show = new EventEmitter<boolean>();

	constructor(protected http:HttpClient,
							protected userService: UserService,
							private router: Router) {
		super(http);
	}

	public login(login: any): Observable<any> {
		const loginModel = { email: login.email, hash: Md5.hashAsciiStr( `${login.email}${login.password}`) };
		return this.post('login', loginModel);
	}

	public logout(){
		this.userService.removeUser();
		this.router.navigateByUrl('login').then(() => {});
		this.showNavigation(false);
	}

	public showNavigation(show: boolean) {
		this.show.emit(show);
	}
}
