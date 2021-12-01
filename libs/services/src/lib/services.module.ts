import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { AlertService } from './alert/alert.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
    imports: [CommonModule, AngularFireAuthModule],
    providers: [AuthService, AlertService, AngularFireAuth],
    exports: [AngularFireAuthModule],
})
export class ServicesModule {}
