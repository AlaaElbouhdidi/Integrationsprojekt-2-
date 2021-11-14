import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register/register-routing.module';
import { RegisterComponent } from './register/register.component';
import { RegisterFormModule } from '@register-form';
import { AlertModule } from '@alert';

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        CommonModule,
        AlertModule,
        RegisterRoutingModule,
        RegisterFormModule,
    ],
    exports: [RegisterComponent],
})
export class RegisterModule {}
