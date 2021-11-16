import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailFormComponent } from './email-form/email-form.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      EmailFormComponent
    ],
    exports: [EmailFormComponent]
})
export class EmailFormModule {}
