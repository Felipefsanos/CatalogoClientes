import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './Pages/home/home.component';
import {LoginService} from "./Services/login.service";
import {HttpClientModule} from "@angular/common/http";
import {LoginGuardService} from "./guards/login-guard.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,

		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		MatFormFieldModule,
		MatInputModule,

	],
  providers: [LoginService, LoginGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
