import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../Services/login.service";
import {UserService} from "../../Services/base/user.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material";
import {TypeAlert} from 'src/app/shared/constants/enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hidePassword: boolean = true;
  submitted = false;

  constructor(private loginService: LoginService,
							private formBuilder: FormBuilder,
							private userService: UserService,
							private router: Router,
							private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.construirForm();
  }

  private onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.loginForm.value).subscribe(res => {
			if (res) {
				this.userService.setUser(res);
				this.router.navigateByUrl('/home');
				this.loginService.showNavigation(true);
			}
		},(e: HttpErrorResponse) => {
			if (e.status == 401){
				this.openSnackBar(e.error.message, 'OK', 15000, TypeAlert.error);
				console.log(e.error.message);
			} else {
				this.openSnackBar(e.error.message, 'OK', 15000, TypeAlert.error);
				console.log('Erro desconhecido');
			}
		});
  }

  private construirForm() {
		this.loginForm = this.formBuilder.group( {
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

	openSnackBar(message: string, action: string, duration: number, type: TypeAlert): void {
		this.snackBar.open(message, action, {
			duration: duration,
			panelClass: type.toString()
		});
	}

	getErrorMessage(control: AbstractControl): string {
		return control.hasError('required') ? 'Campo obrigatório' :
			control.hasError('email') ? 'Email inválido' :
			control.hasError('minlength') ? 'Senha deve ser maior que 8 caracteres' : 'ERROR';
	}

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

}
