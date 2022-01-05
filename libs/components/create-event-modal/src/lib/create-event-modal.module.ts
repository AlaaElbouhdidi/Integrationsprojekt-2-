import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventModalComponent } from './create-event-modal/create-event-modal.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      CreateEventModalComponent
    ],
    exports: [CreateEventModalComponent]
})
export class CreateEventModalModule {}
