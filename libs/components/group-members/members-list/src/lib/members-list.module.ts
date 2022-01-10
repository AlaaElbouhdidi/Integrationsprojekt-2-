import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MembersListComponent } from './members-list/members-list.component';
import { MembersListItemModule } from '@group-members-list-item';
import { ConfirmationModalModule } from '@confirmation-modal';
import {
    FaIconLibrary,
    FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import {
    faExclamationCircle,
    faSearch,
    faTimesCircle,
    faUserPlus,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import { InviteMembersModule } from '@invite-members';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from '@loader';

export const membersListRoutes: Route[] = [];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MembersListItemModule,
        FontAwesomeModule,
        ConfirmationModalModule,
        InviteMembersModule,
        Ng2SearchPipeModule,
        FormsModule,
        LoaderModule
    ],
    declarations: [MembersListComponent],
    exports: [MembersListComponent]
})
export class MembersListModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faUsers,
            faUserPlus,
            faSearch,
            faTimesCircle,
            faExclamationCircle
        );
    }
}
