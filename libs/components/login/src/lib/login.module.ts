import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login/login-routing.module';
import { LoginFormModule } from '@login-form';
import { AlertModule } from '@alert';
import { EmailFormModule } from '@email-form';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        LoginFormModule,
        AlertModule,
        EmailFormModule
    ],
    declarations: [LoginComponent],
    exports: [LoginComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginModule {}
