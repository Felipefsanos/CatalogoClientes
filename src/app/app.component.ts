import {Component, OnInit} from '@angular/core';
import {LoginService} from "./Services/login.service";
import {HomeService} from "./Services/home.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  showNavigation = false;
	back: boolean = false;
  search: boolean = false;
  filter: string;


  constructor(private loginService: LoginService,
							private homeService: HomeService,
							private router: Router){}

  ngOnInit(){
    this.loginService.show.subscribe(
      show => this.showNavigation = show
    );
  }

  logout(){
		this.loginService.logout();
	}

	goBack(){
		this.router.initialNavigation();
	}

	applyFilter(filterValue: string) {
		this.homeService.filter.emit(filterValue.trim().toLowerCase());
	}

	clearFilter(){
  	this.filter = '';
  	this.homeService.filter.emit(this.filter);
	}


}
