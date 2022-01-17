import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import {
    FontAwesomeModule,
    FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [CommonModule, FontAwesomeModule],
    declarations: [ConfirmationModalComponent],
    exports: [ConfirmationModalComponent]
})
export class ConfirmationModalModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faTimesCircle);
    }
}
