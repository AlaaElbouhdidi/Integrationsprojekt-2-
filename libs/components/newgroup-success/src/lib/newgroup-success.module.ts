import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewgroupSuccessComponent } from './newgroup-success.component';

import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AlertModule } from '@alert';
import { InviteMembersModule } from '@invite-members';
import {
    faExclamationCircle,
    faSearch,
    faTimesCircle,
    faUserPlus,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import {
    FaIconLibrary,
    FontAwesomeModule
} from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        AlertModule,
        RouterModule,
        InviteMembersModule,
        FontAwesomeModule
    ],
    declarations: [NewgroupSuccessComponent],
    exports: [NewgroupSuccessComponent]
})
export class NewgroupSuccessModule {
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
