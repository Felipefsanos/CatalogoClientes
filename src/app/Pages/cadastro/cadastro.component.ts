import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../Services/login.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
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
			razaoSocial: ['', [Validators.required]],
			cnpj: ['', [Validators.required, Validators.minLength(12)]],
			nomeFantasia: ['', [Validators.required]],
			inscricaoEstadual: ['', [Validators.required, Validators.minLength(13)]],
			telefones: this.formBuilder.array([
				this.formBuilder.group({
					telefone: ['', [Validators.required, Validators.minLength(11)]],
					contato: ['', [Validators.required]]
				})
			]),
			email1: [''],
			email2: [''],
			endereco: this.formBuilder.group({
				logradouro: ['', [Validators.required]],
				numero: ['', [Validators.required]],
				complemento: [''],
				bairro: ['', [Validators.required]],
				cidade: ['', [Validators.required]],
				uf: ['', [Validators.required]],
			}),
			observacoes: ['']
		})
	}

	adicionarMaisTelefone(): void {
		this.telefones.push(this.formBuilder.group({
			telefone: [''],
			contato: ['']
		}));
	}

	removerTelefone(index: number): void {
		this.telefones.removeAt(index);
	}

	onSubmit() {
		// if (this.form.invalid) {
		// 	return;
		// }
		this.cadastroService.enviarCliente(this.form.value).subscribe(res => {
			if (res) {
				console.log(res);
			}
		});
	}

	getMessagemObrigatorio(): string {
		return 'Campo Obrigatório';
	}

	get telefones(): FormArray {
		return this.form.get('telefones') as FormArray
	}

	get endereco(): FormGroup {
		return this.form.get('endereco') as FormGroup
	}
}
