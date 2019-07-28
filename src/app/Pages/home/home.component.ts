import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {MatSort} from "@angular/material/sort";
import {UserService} from "../../Services/base/user.service";
import {LoginService} from "../../Services/login.service";
import {Cliente} from 'src/app/models/cliente';
import {ModalConfirmacaoComponent} from "../../shared/modal-confirmacao/modal-confirmacao.component";
import {HomeService} from "../../Services/home.service";
import {MessageService} from "../../Services/base/message.service";
import {Router} from "@angular/router";


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	displayedColumns: string[] = ['Nome Fantasia', 'Telefone', 'Contato', 'Ação'];

	@ViewChild(MatSort, {static: true}) sort: MatSort;
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	dataSource: MatTableDataSource<Cliente[]>;

	constructor(private userService: UserService,
							private loginService: LoginService,
							private dialog: MatDialog,
							private homeService: HomeService,
							private messageService: MessageService,
							private router: Router) {
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

