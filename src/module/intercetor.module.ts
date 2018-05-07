import { Injectable, NgModule, ViewChild } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { NavController } from "ionic-angular";

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  @ViewChild('content') nav: NavController;
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth = sessionStorage.getItem('auth');
    let dupReq = req;

    if (auth) {
      dupReq = req.clone({headers: req.headers.set('Authorization', auth)}); 
    }
    return next.handle(dupReq).do(event => {
      if (event instanceof HttpResponse) {
        console.log(event.status);
        sessionStorage.setItem('auth', event.headers.get("Authorization"));
      }
    });
  }
}
@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true
    },
  ],
})
export class InterceptorModule {}