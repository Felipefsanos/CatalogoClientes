import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./Pages/login/login.component";
import {HomeComponent} from "./Pages/home/home.component";
import {LoginGuardService} from "./guards/login-guard.service";
import {CadastroComponent} from "./Pages/cadastro/cadastro.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [LoginGuardService]},
	{ path: 'cadastro', component: CadastroComponent, canActivate: [LoginGuardService]},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
