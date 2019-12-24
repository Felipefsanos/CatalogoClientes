import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {MatSort} from "@angular/material/sort";
import {UserService} from "../../Services/base/user.service";
import {LoginService} from "../../Services/login.service";
import {Cliente} from 'src/app/models/cliente';
import {ModalConfirmacaoComponent} from "../../shared/modal-confirmacao/modal-confirmacao.component";
import {HomeService} from "../../Services/home.service";
import {MessageService} from "../../Services/base/message.service";
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0'})),
			state('expanded', style({height: '*'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class HomeComponent implements OnInit {
	// displayedColumns: string[] = ['Nome Fantasia', 'Telefone', 'Contato', 'Ação'];
	displayedColumns: string[] = ['CNPJ', 'Nome Fantasia', 'Telefone', 'Contato', 'Ação'];
	columnsToDisplay = ['cnpj', 'nomeFantasia', 'telefone', 'contato', 'acao'];

	@ViewChild(MatSort, {static: true}) sort: MatSort;
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	dataSource: MatTableDataSource<Cliente[]>;

	constructor(private userService: UserService,
							private loginService: LoginService,
							private dialog: MatDialog,
							private homeService: HomeService,
							private messageService: MessageService) {
		loginService.showNavigation(true);
	}

	ngOnInit() {
		this.obterClients();
		this.applyFilter();
	}

	applyFilter() {
		this.homeService.filter.subscribe(filterValue => this.dataSource.filter = filterValue);
	}

	delete(cliente: Cliente) {
		const dialogRef = this.dialog.open(ModalConfirmacaoComponent, { data: cliente.id});

		dialogRef.afterClosed().subscribe(mensagem => {
			if(mensagem.error) {
				this.messageService.errorMessage(mensagem.error);
			}
			else{
				this.messageService.successMessage(mensagem.success);
				this.obterClients();
			}
		});
	}

	obterClients(): void {
		this.homeService.obterClientes().subscribe(res => {
			if (res) {
				console.log(res);
				this.dataSource = new MatTableDataSource<Cliente[]>(res);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			}
		}, error => {
			this.messageService.errorMessage('Erro ao obter lista de clientes');
			console.log(error);
		})
	}
}

