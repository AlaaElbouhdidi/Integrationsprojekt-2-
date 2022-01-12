import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditEventModalComponent } from './edit-event-modal/edit-event-modal.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      EditEventModalComponent
    ],
    exports: [EditEventModalComponent]
})
export class EditEventModalModule {}
