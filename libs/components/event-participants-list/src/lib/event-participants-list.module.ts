import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventParticipantsListComponent } from './event-participants-list/event-participants-list.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      EventParticipantsListComponent
    ],
    exports: [EventParticipantsListComponent]
})
export class EventParticipantsListModule {}
