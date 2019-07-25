import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  public successMessage(message: string): void{

  	this.snackBar.open(message, 'OK', {
  		panelClass: ['success'],
			duration: 5000,
			verticalPosition: "top",
			horizontalPosition: "right",
		})

	}

	public errorMessage(message: string): void{

		this.snackBar.open(message, 'OK', {
			panelClass: ['error'],
			duration: 5000,
			verticalPosition: "top",
			horizontalPosition: "right",
		})

	}
}
