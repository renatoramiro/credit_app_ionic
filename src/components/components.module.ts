import { NgModule } from '@angular/core';
import { ActivateUserComponent } from './activate-user/activate-user';
import { CreateClientComponent } from './create-client/create-client';
import { RegistrationComponent } from './registration/registration';
@NgModule({
	declarations: [ActivateUserComponent,
    CreateClientComponent,
    RegistrationComponent],
	imports: [],
	exports: [ActivateUserComponent,
    CreateClientComponent,
    RegistrationComponent]
})
export class ComponentsModule {}
