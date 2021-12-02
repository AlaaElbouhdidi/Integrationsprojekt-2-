import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      ChangePasswordFormComponent
    ],
    exports: [ChangePasswordFormComponent]
})
export class ChangePasswordFormModule {}
