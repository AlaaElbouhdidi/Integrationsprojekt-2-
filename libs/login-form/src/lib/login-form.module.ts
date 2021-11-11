import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { LoaderModule } from '@integrationsprojekt2/loader';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        RouterModule,
        LoaderModule
    ],
    declarations: [
      LoginFormComponent
    ],
    exports: [LoginFormComponent]
})
export class LoginFormModule {}
