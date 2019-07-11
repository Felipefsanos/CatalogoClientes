import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserService} from "./user.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

	baseUrl: string = environment.api;

  constructor(protected http: HttpClient, protected userService?: UserService) { }

  getHttpHeaders(): HttpHeaders{
  	const user = this.userService.getUser();
  	if (user == null){
			return;
		}
		return new HttpHeaders({'Authorization': `Bearer ${user.token}`})
	}

  public get(url: string, params?: string): Observable<any>{
			return this.http.get(this.baseUrl + url, {headers: this.getHttpHeaders(), params: {params}});
	}

	public post(url: string, body?: any): Observable<any>{
		return this.http.post( this.baseUrl + url, body,{headers: this.getHttpHeaders()});
	}

	public put(url: string, body?: any): Observable<any>{
		return this.http.put(this.baseUrl + url, body,{headers: this.getHttpHeaders()});
	}

	public delete(url: string, params?: string): Observable<any>{
		return this.http.delete(this.baseUrl + url, {headers: this.getHttpHeaders(), params: {params}});
	}
}
