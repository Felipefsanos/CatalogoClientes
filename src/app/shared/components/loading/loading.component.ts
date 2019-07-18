import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoadingService} from "../../../Services/base/loading.service";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {

	show: boolean = false;

	private subscription: Subscription;

  constructor(private loadingService:LoadingService) { }

  ngOnInit(): void {
		this.subscription = this.loadingService.loaderState
			.subscribe((state: boolean) => {
				this.show = state;
			});
  }

	ngOnDestroy(): void {
  	this.subscription.unsubscribe();
	}

}
