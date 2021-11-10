import { NgModule } from '@angular/core';
import { RegisterRoutingModule } from './register/register-routing.module';
import { RegisterComponent } from './register/register.component';
import { RegisterFormModule } from '@integrationsprojekt2/register-form';
import { AlertModule } from '@integrationsprojekt2/alert';

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        AlertModule,
        RegisterRoutingModule,
        RegisterFormModule,
    ],
    exports: [RegisterComponent],
})
export class RegisterModule {}
