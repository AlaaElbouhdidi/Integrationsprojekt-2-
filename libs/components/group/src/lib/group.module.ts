import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group/group.component';
import { GroupRoutingModule } from './group/group-routing.module';
import { ConfirmationModalModule } from '@confirmation-modal';
import {
    FontAwesomeModule,
    FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
    faCommentAlt,
    faUserFriends,
    faTable,
    faCalendarAlt,
    faCog,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { MembersListModule } from '@group-members-list';
import { GroupsModule } from '@groups';
import { GroupSettingModule } from '@group-setting';

@NgModule({
    imports: [
        CommonModule,
        GroupRoutingModule,
        FontAwesomeModule,
        GroupsModule,
        MembersListModule,
        GroupSettingModule,
        ConfirmationModalModule
    ],
    declarations: [GroupComponent],
    exports: [GroupComponent]
})
export class GroupModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faCommentAlt,
            faUserFriends,
            faTable,
            faCalendarAlt,
            faCog,
            faSignOutAlt
        );
    }
}
