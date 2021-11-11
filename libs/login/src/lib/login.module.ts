import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login/login-routing.module';
import { LoginFormModule } from '@integrationsprojekt2/login-form';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        LoginFormModule
    ],
    declarations: [
      LoginComponent
    ],
    exports: [LoginComponent]
})
export class LoginModule {}
