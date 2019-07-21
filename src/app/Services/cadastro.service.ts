import {Injectable} from '@angular/core';
import {BaseHttpService} from "./base/base-http.service";
import {HttpClient} from "@angular/common/http";
import {Cliente} from "../models/cliente";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CadastroService extends BaseHttpService {

  constructor(protected http: HttpClient) {
  	super(http);
	}

  enviarCliente(cliente: Cliente): Observable<any>{
		return this.post('clients', cliente);
	}
}
