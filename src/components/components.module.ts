import { NgModule } from '@angular/core';
import { ActivateUserComponent } from './activate-user/activate-user';
import { CreateClientComponent } from './create-client/create-client';
import { RegistrationComponent } from './registration/registration';
import { SendCreditComponent } from './send-credit/send-credit';
@NgModule({
	declarations: [ActivateUserComponent,
    CreateClientComponent,
    RegistrationComponent,
    SendCreditComponent],
	imports: [],
	exports: [ActivateUserComponent,
    CreateClientComponent,
    RegistrationComponent,
    SendCreditComponent]
})
export class ComponentsModule {}
