import { NgModule } from '@angular/core';
import { AuthHandlerComponent } from './auth-handler/auth-handler.component';
import { CommonModule } from '@angular/common';
import { AuthHandlerRoutingModule } from './auth-handler/auth-handler-routing.module';
import { PasswordResetFormModule } from '@password-reset-form';
import { AuthService } from '@services';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@NgModule({
    imports: [CommonModule, AuthHandlerRoutingModule, PasswordResetFormModule],
    declarations: [AuthHandlerComponent],
    exports: [
        AuthHandlerComponent,
        CommonModule,
        AuthHandlerRoutingModule,
        PasswordResetFormModule
    ],
    providers: [AuthService, AngularFireAuth]
})
export class AuthHandlerModule {}
