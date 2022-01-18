import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups/groups.component';
import { ServicesModule } from '@services';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
    FaIconLibrary,
    FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import {
    faCircle,
    faSearch,
    faUserFriends,
    faStar,
    faCalendarAlt,
    faClock,
    faCheck,
    faTimes,
    faPaperPlane,
    faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        ServicesModule,
        BrowserModule,
        Ng2SearchPipeModule,
        FormsModule,
        RouterModule
    ],

    declarations: [GroupsComponent],
    exports: [GroupsComponent]
})
export class GroupsModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faUserFriends,
            faSearch,
            faCircle,
            faStar,
            faCalendarAlt,
            faClock,
            faCheck,
            faTimes,
            faPaperPlane,
            faExclamationCircle
        );
    }
}
