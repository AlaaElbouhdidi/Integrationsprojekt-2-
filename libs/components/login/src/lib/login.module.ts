import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login/login-routing.module';
import { LoginFormModule } from '@integrationsprojekt2/login-form';
import { AlertModule } from '@integrationsprojekt2/alert';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        LoginFormModule,
        AlertModule
    ],
    declarations: [
      LoginComponent
    ],
    exports: [LoginComponent]
})
export class LoginModule {}
