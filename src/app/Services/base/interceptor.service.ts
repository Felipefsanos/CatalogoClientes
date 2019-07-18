import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";
import {LoadingService} from "./loading.service";

@Injectable({
	providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

	constructor(private loadingService: LoadingService) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		this.loadingService.show();
		return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					this.loadingService.hide();
				}
			},
			(err: any) => {
				this.loadingService.hide();
				console.log(err);
			}));
	}
}
