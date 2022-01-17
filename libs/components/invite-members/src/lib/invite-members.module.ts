import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InviteMembersComponent } from './invite-members/invite-members.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
    FontAwesomeModule,
    FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
    faExclamationCircle,
    faAngleDoubleRight,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [
        CommonModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        FontAwesomeModule
    ],
    declarations: [InviteMembersComponent],
    exports: [InviteMembersComponent]
})
export class InviteMembersModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faExclamationCircle, faAngleDoubleRight, faInfoCircle);
    }
}
