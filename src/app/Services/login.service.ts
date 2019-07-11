import {EventEmitter, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {BaseHttpService} from "./base/base-http.service";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./base/user.service";
import {Md5} from 'ts-md5/dist/md5';

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

	public login(login: any) {
		const loginModel = { email: login.email, hash: Md5.hashAsciiStr( `${login.email}${login.password}`) };
		this.post('login', loginModel).subscribe(res => {
			if (res) {
				this.userService.setUser(res);
				this.router.navigateByUrl('/home');
				this.showNavigation(true);
			}
		})
	}

	public logout(){
		this.userService.removeUser();
		this.router.navigateByUrl('login');
		this.showNavigation(false);
	}

	public showNavigation(show: boolean) {
		this.show.emit(show);
	}
}
