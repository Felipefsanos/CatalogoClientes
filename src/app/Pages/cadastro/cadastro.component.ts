import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../Services/login.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constantes} from "../../shared/constants/constantes";
import {CadastroService} from "../../Services/cadastro.service";
import {MessageService} from "../../Services/base/message.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {Cliente} from "../../models/cliente";
import {Telefone} from "../../models/telefone";
import {Endereco} from "../../models/endereco";

@Component({
	selector: 'app-cadastro',
	templateUrl: './cadastro.component.html',
	styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

	estados: string[] = Constantes.estados;
	form: FormGroup;
	editMode = false;
	idCliente: number;

	constructor(private loginService: LoginService,
							private formBuilder: FormBuilder,
							private cadastroService: CadastroService,
							private message: MessageService,
							private activatedRoute: ActivatedRoute,
							private  router: Router) {
		loginService.showNavigation(true);


	}

	ngOnInit() {
		this.construirFormulario();
		if (this.router.url.includes('editar')) {
			this.editMode = true;
			this.activatedRoute.paramMap.pipe(
				switchMap((params: ParamMap) =>
					this.cadastroService.obterCliente(parseInt(params.get('id')))
				)
			).subscribe(res => {
					this.idCliente = res.id;
					this.construirFormulario(res);
				}, (error: HttpErrorResponse) => {
					this.message.errorMessage(error.message);
				}
			);

		}
	}

	construirFormulario(cliente?: Cliente): void {

		if (!cliente) {
			cliente = new Cliente();
			cliente.telefones = [new Telefone()];
			cliente.endereco = new Endereco()
		}

		this.form = this.formBuilder.group({
			razaoSocial: [cliente.razaoSocial, [Validators.required]],
			cnpj: [cliente.cnpj, [Validators.required, Validators.minLength(12)]],
			nomeFantasia: [cliente.nomeFantasia, [Validators.required]],
			inscricaoEstadual: [cliente.inscricaoEstadual, [Validators.required, Validators.minLength(13)]],
			telefones: this.formBuilder.array([]),
			email1: [cliente.email1],
			email2: [cliente.email2],
			endereco: this.formBuilder.group({
				logradouro: [cliente.endereco.logradouro, [Validators.required]],
				numero: [cliente.endereco.numero, [Validators.required]],
				complemento: [cliente.endereco.complemento],
				bairro: [cliente.endereco.bairro, [Validators.required]],
				cidade: [cliente.endereco.cidade, [Validators.required]],
				uf: [cliente.endereco.uf, [Validators.required]],
			}),
			observacoes: ['']
		});

		for (const telefone of cliente.telefones) {
			this.telefones.push(this.formBuilder.group({
				numero: [telefone.numero, [Validators.required, Validators.minLength(11)]],
				contato: [telefone.contato, Validators.required]
			}));
		}
	}

	adicionarMaisTelefone(): void {
		this.telefones.push(this.formBuilder.group({
			numero: [''],
			contato: ['']
		}));
	}

	removerTelefone(index: number): void {
		this.telefones.removeAt(index);
	}

	onSubmit() {
		if (this.form.invalid) {
			return;
		}

		if (this.editMode){
			this.cadastroService.editarCliente(this.idCliente, this.form.value).subscribe(() => {
				const snackBarRef = this.message.successMessage('Cliente alterado com sucesso!');
				snackBarRef.afterOpened().subscribe(() => {
					this.router.navigateByUrl('/home');
				});
			}, error => {
				this.message.errorMessage(error.message);
			});
		}
		else {
			this.cadastroService.enviarCliente(this.form.value).subscribe(() => {
				this.message.successMessage('Cliente salvo com sucesso');
				this.router.navigateByUrl('/home');
			}, error => {
				this.message.errorMessage(error.message);
				console.log(error)
			});
		}
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
