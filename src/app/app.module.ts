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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
		HttpClientModule
  ],
  providers: [LoginService, LoginGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
