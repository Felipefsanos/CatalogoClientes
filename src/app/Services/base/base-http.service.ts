import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

	baseUrl: string = environment.api;

  constructor(protected http: HttpClient) { }

  public get(url: string, params?: string): Observable<any>{
			return this.http.get(this.baseUrl + url, { params: {params}});
	}

	public post(url: string, body?: any): Observable<any>{
		return this.http.post( this.baseUrl + url, body);
	}

	public put(url: string, body?: any): Observable<any>{
		return this.http.put(this.baseUrl + url, body);
	}

	public delete(url: string, params?: string): Observable<any>{
		return this.http.delete(this.baseUrl + url,{ params: {params}});
	}
}
