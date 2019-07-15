import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
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
	displayedColumns: string[] = ['name', 'weight', 'symbol', 'acao'];
	dataSource = new MatTableDataSource(ELEMENT_DATA);

	@ViewChild(MatSort, {static: true}) sort: MatSort;
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

	constructor(private userService: UserService,
							private loginService: LoginService,
							private dialog: MatDialog,
							private homeService: HomeService){
			loginService.showNavigation(true);
	}

	ngOnInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.applyFilter();
	}

	applyFilter() {
		this.homeService.filter.subscribe( filterValue => this.dataSource.filter = filterValue);
	}

	delete(cliente: Cliente){
		this.dialog.open(ModalConfirmacaoComponent, { width: '250px'});
	}
}

export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
	{position: 1, name: 'HydrogenHydrogenHydrogenHydrogen', weight: 1.0079, symbol: 'H'},
	{position: 2, name: 'HeliumHeliumHeliumHeliumHeliumHelium', weight: 4.0026, symbol: 'He'},
	{position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
	{position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
	{position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
	{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
	{position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
	{position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
	{position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
	{position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
	{position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
	{position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
	{position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
	{position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
	{position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
	{position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
	{position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
	{position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
	{position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
	{position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

