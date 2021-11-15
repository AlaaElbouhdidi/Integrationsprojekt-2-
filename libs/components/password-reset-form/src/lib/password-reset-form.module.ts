import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordResetFormComponent } from './password-reset-form/password-reset-form.component';

@NgModule({
    imports: [CommonModule],
    declarations: [PasswordResetFormComponent],
    exports: [PasswordResetFormComponent]
})
export class PasswordResetFormModule {}
