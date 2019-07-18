import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './Pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from './Pages/home/home.component';
import {LoginService} from "./Services/login.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginGuardService} from "./guards/login-guard.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
	_MatMenuDirectivesModule,
	MatButtonModule,
	MatCardModule,
	MatDialogModule,
	MatDividerModule,
	MatFormFieldModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatMenuModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
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
import {LoadingComponent} from './shared/components/loading/loading.component';
import {InterceptorService} from "./Services/base/interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CadastroComponent,
    ModalConfirmacaoComponent,
    LoadingComponent
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
		FlexLayoutModule,
		MatProgressSpinnerModule,
		_MatMenuDirectivesModule,
		MatMenuModule

	],
  providers: [LoginService, LoginGuardService, {
		provide: HTTP_INTERCEPTORS,
		useClass: InterceptorService,
		multi: true
	}],
  bootstrap: [AppComponent],
	entryComponents: [ModalConfirmacaoComponent]
})
export class AppModule { }
