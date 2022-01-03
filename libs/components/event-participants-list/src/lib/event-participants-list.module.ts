import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventParticipantsListComponent } from './event-participants-list/event-participants-list.component';
import { UserIconModule } from '@user-icon';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faExclamationCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [
        CommonModule,
        UserIconModule,
        FontAwesomeModule,
        FormsModule
    ],
    declarations: [
      EventParticipantsListComponent
    ],
    exports: [EventParticipantsListComponent]
})
export class EventParticipantsListModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faExclamationCircle,
            faSearch
        );
    }
}
