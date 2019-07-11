import { Injectable } from '@angular/core';
import {User} from "../../models/user";
import {Token} from "../../models/token";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {

	currentUser: User;

  constructor() {
  	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}

	getUser(): User{
  	return this.currentUser;
	}

	setUser(token: Token): void{
  	localStorage.clear();
  	this.currentUser = UserService.decodeToken(token);
  	localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
	}

	removeUser(): void{
  	this.currentUser = null;
  	localStorage.clear();
	}

	private static decodeToken(token: Token): User {
		const decodedToken = jwt_decode(token.token);
		return { name: decodedToken.unique_name, token: token, email: decodedToken.email};
	}
}
