import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoaderModule } from '@integrationsprojekt2/loader'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LoaderModule,
        ReactiveFormsModule,
    ],
    declarations: [RegisterFormComponent],
    exports: [RegisterFormComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterFormModule {}


