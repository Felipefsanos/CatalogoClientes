import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

	filter = new EventEmitter<string>();

  constructor() { }
}
