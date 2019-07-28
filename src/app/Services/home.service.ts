import {EventEmitter, Injectable} from '@angular/core';
import {BaseHttpService} from "./base/base-http.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseHttpService{

	filter = new EventEmitter<string>();

  constructor(protected http: HttpClient) {
  	super(http);
	}

	obterClientes(): Observable<any> {
		return this.get('clients');
	}

	excluirCliente(id: number): Observable<any> {
		return this.delete(`clients/${id}`);
	}
}
