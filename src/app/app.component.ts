import {Component, OnInit} from '@angular/core';
import {LoginService} from "./Services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CatalogoClientes';

  showNavigation = false;

  constructor(private loginService: LoginService){}

  ngOnInit(){
    this.loginService.show.subscribe(
      show => this.showNavigation = show
    );
  }

  logout(){
		this.loginService.logout();
	}
}
