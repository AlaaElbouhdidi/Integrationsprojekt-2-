import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventFormComponent } from './create-event-form/create-event-form.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      CreateEventFormComponent
    ],
    exports: [CreateEventFormComponent]
})
export class CreateEventFormModule {}
