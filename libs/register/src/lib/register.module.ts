import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register/register-routing.module';
import { RegisterComponent } from './register/register.component';
import { RegisterFormModule } from '@integrationsprojekt2/register-form';
import { AlertModule } from '@integrationsprojekt2/alert';

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        CommonModule,
        AlertModule,
        RegisterRoutingModule,
        RegisterFormModule,
    ],
    exports: [RegisterComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterModule {}
