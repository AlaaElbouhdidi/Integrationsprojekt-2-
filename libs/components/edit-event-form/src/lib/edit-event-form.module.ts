import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditEventFormComponent } from './edit-event-form/edit-event-form.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      EditEventFormComponent
    ],
    exports: [EditEventFormComponent]
})
export class EditEventFormModule {}
