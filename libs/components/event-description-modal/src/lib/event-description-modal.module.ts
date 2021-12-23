import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDescriptionModalComponent } from './event-description-modal/event-description-modal.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      EventDescriptionModalComponent
    ],
    exports: [EventDescriptionModalComponent]
})
export class EventDescriptionModalModule {}
