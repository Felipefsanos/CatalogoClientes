import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../Services/login.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Constantes} from "../../shared/constants/constantes";
import {CadastroService} from "../../Services/cadastro.service";

@Component({
	selector: 'app-cadastro',
	templateUrl: './cadastro.component.html',
	styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

	estados: string[] = Constantes.estados;
	form: FormGroup;

	constructor(private loginService: LoginService,
							private formBuilder: FormBuilder,
							private cadastroService: CadastroService) {
		loginService.showNavigation(true);
	}

	ngOnInit() {
		this.construirFormulario();
	}

	construirFormulario(): void {
		this.form = this.formBuilder.group({
			'nome': [''],
			'telefone': ['']
		})
	}

}
