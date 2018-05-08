import { Injectable, NgModule } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AlertController, Events } from "ionic-angular";

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  constructor(public alertCtrl: AlertController, public events: Events) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth = sessionStorage.getItem('auth');
    let dupReq = req;

    if (auth) {
      dupReq = req.clone({headers: req.headers.set('Authorization', auth)}); 
    }
    return next.handle(dupReq).do(event => {
      if (event instanceof HttpResponse) {
        sessionStorage.setItem('auth', event.headers.get("Authorization"));
      }
    }, (err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.events.publish('not-authorized', true);
          this.alertCtrl.create({
            title: 'Não autorizado',
            subTitle: err.error.message,
            buttons: ['OK']
          }).present();
        }

        if (err.status === 404) {
          this.alertCtrl.create({
            title: 'Tivemos um problema',
            subTitle: err.error.message,
            buttons: ['OK']
          }).present();
        }

        if (err.status === 500) {          
          this.alertCtrl.create({
            title: 'Problema',
            subTitle: err.error.errors.detail,
            buttons: ['OK']
          }).present();
        }
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