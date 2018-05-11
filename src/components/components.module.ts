import { NgModule } from '@angular/core';
import { ActivateUserComponent } from './activate-user/activate-user';
import { CreateClientComponent } from './create-client/create-client';
import { RegistrationComponent } from './registration/registration';
import { TransferInfoComponent } from './transfer-info/transfer-info';
@NgModule({
	declarations: [ActivateUserComponent,
    CreateClientComponent,
    RegistrationComponent,
    TransferInfoComponent],
	imports: [],
	exports: [ActivateUserComponent,
    CreateClientComponent,
    RegistrationComponent,
    TransferInfoComponent]
})
export class ComponentsModule {}
