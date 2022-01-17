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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, FormsModule],
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
