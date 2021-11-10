import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from './register-form/register-form.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [RegisterFormComponent],
    exports: [RegisterFormComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterFormModule {}
