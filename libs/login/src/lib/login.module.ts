import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login/login-routing.module';

@NgModule({
    imports: [CommonModule, LoginRoutingModule],
    declarations: [
      LoginComponent
    ],
    exports: [LoginComponent]
})
export class LoginModule {}
