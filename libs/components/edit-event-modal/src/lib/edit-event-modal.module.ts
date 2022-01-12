import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditEventModalComponent } from './edit-event-modal/edit-event-modal.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCalendarAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    declarations: [
      EditEventModalComponent
    ],
    exports: [EditEventModalComponent]
})
export class EditEventModalModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faCalendarAlt,
            faTimesCircle
        );
    }
}
