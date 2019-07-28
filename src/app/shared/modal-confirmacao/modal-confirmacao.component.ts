import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HomeService} from "../../Services/home.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
	selector: 'app-modal-confirmacao',
	templateUrl: './modal-confirmacao.component.html',
	styleUrls: ['./modal-confirmacao.component.css']
})
export class ModalConfirmacaoComponent implements OnInit {

	constructor(public dialogRef: MatDialogRef<ModalConfirmacaoComponent>,
							@Inject(MAT_DIALOG_DATA) public data: number,
							private homeService: HomeService) {
	}

	ngOnInit(): void {
	}

	excluirRegistro(){
		this.homeService.excluirCliente(this.data).subscribe(() => {
			this.dialogRef.close({success: 'Cliente excluído com sucesso'});
		}, (error: HttpErrorResponse) => {
			this.dialogRef.close({error: error.message});
		});
	}
}
