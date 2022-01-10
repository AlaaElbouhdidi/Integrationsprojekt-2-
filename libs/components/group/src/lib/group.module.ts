import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group/group.component';
import { GroupRoutingModule } from './group/group-routing.module';
import {
    FontAwesomeModule,
    FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
    faCommentAlt,
    faUserFriends,
    faTable,
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import {
    MembersListModule
} from '@group-members-list';

@NgModule({
    imports: [
        CommonModule,
        GroupRoutingModule,
        FontAwesomeModule,
        MembersListModule
    ],
    declarations: [GroupComponent],
    exports: [GroupComponent]
})
export class GroupModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faCommentAlt, faUserFriends, faTable, faCalendarAlt);
    }
}
