import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from "@angular/material";
import {MatSort} from "@angular/material/sort";
import {UserService} from "../../Services/base/user.service";
import {LoginService} from "../../Services/login.service";
import {Cliente} from 'src/app/models/cliente';
import {ModalConfirmacaoComponent} from "../../shared/modal-confirmacao/modal-confirmacao.component";
import {HomeService} from "../../Services/home.service";


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
							private snackBar: MatSnackBar) {
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
		this.dialog.open(ModalConfirmacaoComponent);
	}

	obterClients(): void {
		this.homeService.obterClientes().subscribe(res => {
			if (res) {
				this.dataSource = new MatTableDataSource<Cliente[]>(res);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			}
		}, error => {
			this.snackBar.open('Erro ao obter lista de clientes', 'OK',
				{
					horizontalPosition: "end",
					verticalPosition: "top",
					duration: 7000,
					panelClass: 'A700'
				});
			console.log(error);
		})
	}
}

