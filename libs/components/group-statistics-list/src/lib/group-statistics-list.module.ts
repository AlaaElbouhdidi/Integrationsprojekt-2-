import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupStatisticsListComponent } from './group-statistics-list/group-statistics-list.component';
import {
    FontAwesomeModule,
    FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
    faEdit
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [CommonModule, FontAwesomeModule],
    declarations: [
      GroupStatisticsListComponent
    ],
    exports: [GroupStatisticsListComponent]
})
export class GroupStatisticsListModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faEdit
        );
    }
}
