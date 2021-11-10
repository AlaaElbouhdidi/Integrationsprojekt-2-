import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoaderModule } from '@integrationsprojekt2/loader'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LoaderModule,
        ReactiveFormsModule,
        FontAwesomeModule
    ],
    declarations: [RegisterFormComponent],
    exports: [RegisterFormComponent],
})
export class RegisterFormModule {}
