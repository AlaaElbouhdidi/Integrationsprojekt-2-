import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupPollsEventsComponent } from './group-polls-events/group-polls-events.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
    faPoll,
    faCalendarAlt,
    faTimesCircle,
    faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import { CreatePollFormModule } from '@create-poll-form';
import { ConfirmationModalModule } from '@confirmation-modal';
import { PollItemModule } from '@poll-item';
import { GroupEventItemModule } from '@group-event-item';
import { EventDescriptionModalModule } from '@event-description-modal';
import { TeamModalModule } from '@team-modal';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        CreatePollFormModule,
        ConfirmationModalModule,
        TeamModalModule,
        PollItemModule,
        GroupEventItemModule,
        EventDescriptionModalModule
    ],
    declarations: [
      GroupPollsEventsComponent
    ],
    exports: [GroupPollsEventsComponent]
})
export class GroupPollsEventsModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faPoll,
            faCalendarAlt,
            faTimesCircle,
            faExclamationCircle
        );
    }
}
