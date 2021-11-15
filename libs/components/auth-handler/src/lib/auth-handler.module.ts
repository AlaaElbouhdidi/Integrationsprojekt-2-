import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthHandlerComponent } from './auth-handler/auth-handler.component';
import { AuthHandlerRoutingModule } from './auth-handler/auth-handler-routing.module';
import { PasswordResetFormModule } from '@password-reset-form';

@NgModule({
    imports: [
        CommonModule,
        AuthHandlerRoutingModule,
        PasswordResetFormModule
    ],
    declarations: [
      AuthHandlerComponent,
    ],
    exports: [AuthHandlerComponent]
})
export class AuthHandlerModule {}
