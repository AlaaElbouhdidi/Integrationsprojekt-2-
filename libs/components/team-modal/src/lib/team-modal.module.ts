import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamModalComponent } from './team-modal/team-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    declarations: [
      TeamModalComponent
    ],
    exports: [TeamModalComponent]
})
export class TeamModalModule {}
