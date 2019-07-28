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
							private cadastroService: CadastroService,
							private message: MessageService,
							private activatedRoute: ActivatedRoute,
							private  router: Router) {
		loginService.showNavigation(true);
	}

	ngOnInit() {
		if (this.router.url.includes('editar')) {
			let id;
			this.activatedRoute.paramMap.pipe(
				switchMap((params: ParamMap) =>
					this.cadastroService.obterCliente(parseInt(params.get('id')))
				)
			).subscribe(res => {
					this.construirFormularioEdicao(res);
				}, (error: HttpErrorResponse) => {
					this.message.errorMessage(error.message);
				}
			);

			this.cadastroService.obterCliente(parseInt(id)).subscribe(res => {
				this.construirFormularioEdicao(res);
			}, (error: HttpErrorResponse) => {
				this.message.errorMessage(error.message);
			});

		} else {
			this.construirFormularioCadastro();

		}
	}

	construirFormularioCadastro(): void {

		this.form = this.formBuilder.group({
			razaoSocial: ['', [Validators.required]],
			cnpj: ['', [Validators.required, Validators.minLength(12)]],
			nomeFantasia: ['', [Validators.required]],
			inscricaoEstadual: ['', [Validators.required, Validators.minLength(13)]],
			telefones: this.formBuilder.array([
				this.formBuilder.group({
					numero: ['', [Validators.required, Validators.minLength(11)]],
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

	construirFormularioEdicao(cliente: Cliente): void {

		this.form = this.formBuilder.group({
			razaoSocial: [cliente.razaoSocial, [Validators.required]],
			cnpj: [cliente.CNPJ, [Validators.required, Validators.minLength(12)]],
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

		if (cliente.telefones.length > 1) {
			for (const telefone of cliente.telefones) {
				this.telefones.push(this.formBuilder.group({
					numero: [telefone.numero, [Validators.required, Validators.minLength(11)]],
					contato: [telefone.contato, Validators.required]
				}));
			}
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

		this.cadastroService.enviarCliente(this.form.value).subscribe(() => {
			this.message.successMessage('Cliente salvo com sucesso');
		}, error => {
			this.message.successMessage(error.message);
			console.log(error)
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
