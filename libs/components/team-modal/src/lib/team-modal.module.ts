import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamModalComponent } from './team-modal/team-modal.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { TeamFormModule } from '@team-form';
import { TeamListModule } from '@team-list';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        TeamFormModule,
        TeamListModule
    ],
    declarations: [
      TeamModalComponent
    ],
    exports: [TeamModalComponent]
})
export class TeamModalModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faUsers
        );
    }
}
