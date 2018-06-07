import { Injectable, NgModule } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AlertController, Events } from "ionic-angular";
import { GlobalProvider } from "../providers/global/global";

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  constructor(public alertCtrl: AlertController, public events: Events, private global: GlobalProvider) {}

  getFields(key) {
    let valuesField = {
      'identity_document': "Documento",
      'phone': "Telefone",
      'password': "Senha"
    }

    if (valuesField[key] === undefined) {
      return key;
    }
    return valuesField[key];
  }

  getErrors(err) {
    let messageError = "";
    for (let index = 0; index < Object.keys(err.error.errors).length; index++) {
      const key = Object.keys(err.error.errors)[index];
      let paragraph = "<p>" + this.getFields(key) + "</p>";
      messageError += paragraph;
      let values = err.error.errors[key];
      messageError += "<ul>";
      for (let index = 0; index < values.length; index++) {
        const value = values[index];
        messageError += "<li>" + value + "</li>";
      }
      messageError += "</ul>";
    }

    return messageError;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth = localStorage.getItem('auth');
    let dupReq = req;

    if (auth) {
      const headers = new HttpHeaders({
        'Authorization': auth,
        'Content-Type': this.global.contentType,
        "Accept": this.global.versionApi
      });
      dupReq = req.clone({headers: headers}); 
    }
    return next.handle(dupReq).do(event => {
      if (event instanceof HttpResponse) {
        localStorage.setItem('auth', event.headers.get("Authorization"));
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

        if (err.status === 400) {
          this.alertCtrl.create({
            title: 'Opss',
            subTitle: err.error.errors.value[0],
            buttons: ['OK']
          }).present();
        }

        if (err.status === 404) {
          let messageError = err.error.message || err.error.errors.detail;
          this.alertCtrl.create({
            title: 'Tivemos um problema',
            subTitle: messageError,
            buttons: ['OK']
          }).present();
        }

        if (err.status === 406) {
          this.events.publish('not-authorized', true);
          this.alertCtrl.create({
            title: 'Tivemos um problema',
            subTitle: "Atualize o seu app!",
            buttons: ['OK']
          }).present();
        }

        if (err.status === 422) {
          this.alertCtrl.create({
            title: 'Tivemos um problema',
            subTitle: this.getErrors(err),
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