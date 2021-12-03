import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeEmailFormComponent } from './change-email-form/change-email-form.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      ChangeEmailFormComponent
    ],
    exports: [ChangeEmailFormComponent]
})
export class ChangeEmailFormModule {}
