import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamModalComponent } from './team-modal/team-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TeamFormModule } from '@team-form';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        TeamFormModule
    ],
    declarations: [
      TeamModalComponent
    ],
    exports: [TeamModalComponent]
})
export class TeamModalModule {}
