import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MembersListComponent } from './members-list/members-list.component';
import { MembersListItemModule } from '@group-members-list-item';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExclamationCircle, faSearch, faTimesCircle, faUser, faUserPlus, faUserTie, faUserTimes } from '@fortawesome/free-solid-svg-icons';


export const membersListRoutes: Route[] = [];

@NgModule({
    imports: [CommonModule, RouterModule, MembersListItemModule,
      FontAwesomeModule,
],
    declarations: [
      MembersListComponent
    ],
    exports: [
      MembersListComponent
    ]
})
export class MembersListModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
        faUser,
        faUserTie,
        faUserPlus,
        faUserTimes,
        faSearch,
        faTimesCircle,
        faExclamationCircle
    );
}

}
