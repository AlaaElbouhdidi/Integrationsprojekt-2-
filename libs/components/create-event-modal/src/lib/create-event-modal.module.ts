import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventModalComponent } from './create-event-modal/create-event-modal.component';
import {
    FontAwesomeModule,
    FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
    faTimesCircle,
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { CreateEventFormModule } from '@create-event-form';

@NgModule({
    imports: [CommonModule, FontAwesomeModule, CreateEventFormModule],
    declarations: [CreateEventModalComponent],
    exports: [CreateEventModalComponent]
})
export class CreateEventModalModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faTimesCircle, faCalendarAlt);
    }
}
