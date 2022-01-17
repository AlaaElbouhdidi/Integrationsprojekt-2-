import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDescriptionModalComponent } from './event-description-modal/event-description-modal.component';
import {
    FontAwesomeModule,
    FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
    faClock,
    faAngleDoubleRight,
    faAlignJustify,
    faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [CommonModule, FontAwesomeModule],
    declarations: [EventDescriptionModalComponent],
    exports: [EventDescriptionModalComponent]
})
export class EventDescriptionModalModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faClock,
            faAngleDoubleRight,
            faAlignJustify,
            faTimesCircle
        );
    }
}
