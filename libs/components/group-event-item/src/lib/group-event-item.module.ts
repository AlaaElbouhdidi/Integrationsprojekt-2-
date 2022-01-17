import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupEventItemComponent } from './group-event-item/group-event-item.component';
import {
    FontAwesomeModule,
    FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
    faClock,
    faCalendarDay,
    faTrash,
    faEdit
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [CommonModule, FontAwesomeModule],
    declarations: [GroupEventItemComponent],
    exports: [GroupEventItemComponent]
})
export class GroupEventItemModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faClock, faCalendarDay, faTrash, faEdit);
    }
}
