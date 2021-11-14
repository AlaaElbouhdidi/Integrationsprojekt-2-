import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login/login-routing.module';
import { LoginFormModule } from '@login-form';
import { AlertModule } from '@alert';

@NgModule({
    imports: [CommonModule, LoginRoutingModule, LoginFormModule, AlertModule],
    declarations: [LoginComponent],
    exports: [LoginComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginModule {}
