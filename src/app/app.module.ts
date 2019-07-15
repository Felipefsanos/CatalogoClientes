import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './Pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from './Pages/home/home.component';
import {LoginService} from "./Services/login.service";
import {HttpClientModule} from "@angular/common/http";
import {LoginGuardService} from "./guards/login-guard.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
	MatButtonModule,
	MatCardModule,
	MatDialogModule,
	MatDividerModule,
	MatFormFieldModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatPaginatorModule,
	MatSelectModule,
	MatSnackBarModule,
	MatSortModule,
	MatTableModule,
	MatToolbarModule
} from "@angular/material";
import {CadastroComponent} from './Pages/cadastro/cadastro.component';
import {ModalConfirmacaoComponent} from './shared/modal-confirmacao/modal-confirmacao.component';
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {NgxMaskModule} from "ngx-mask";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CadastroComponent,
    ModalConfirmacaoComponent
  ],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		NgxMaskModule.forRoot(),

		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		MatFormFieldModule,
		MatInputModule,
		MatDialogModule,
		MatSelectModule,
		MatGridListModule,
		MatIconModule,
		MatToolbarModule,
		FlexModule,
		MatCardModule,
		MatDividerModule,
		MatButtonModule,
		MatSnackBarModule,
		FormsModule,
		FlexLayoutModule

	],
  providers: [LoginService, LoginGuardService],
  bootstrap: [AppComponent],
	entryComponents: [ModalConfirmacaoComponent]
})
export class AppModule { }
