import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupPollsEventsComponent } from './group-polls-events/group-polls-events.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      GroupPollsEventsComponent
    ],
    exports: [GroupPollsEventsComponent]
})
export class GroupPollsEventsModule {}
