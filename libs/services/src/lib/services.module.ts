import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@NgModule({
    imports: [CommonModule],
    providers: [AuthService, AlertService, AngularFireAuth],
})
export class ServicesModule {}
