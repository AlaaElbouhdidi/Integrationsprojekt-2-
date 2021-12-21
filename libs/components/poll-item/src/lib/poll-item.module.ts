import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollItemComponent } from './poll-item/poll-item.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    declarations: [
      PollItemComponent
    ],
    exports: [PollItemComponent]
})
export class PollItemModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faTrash
        );
    }
}
