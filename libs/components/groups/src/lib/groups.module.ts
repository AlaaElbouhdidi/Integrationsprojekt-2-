import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupModalDialogComponent } from './group-modal-dialog/group-modal-dialog.component';
import { GroupsSectionScreenComponent } from './groups-section-screen/groups-section-screen.component';
import { GroupItemScreenComponent } from './group-item-screen/group-item-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GroupRoutingModule } from './group-routing.module';
import { LoaderModule } from '@loader';

@NgModule({
    imports: [CommonModule, HttpClientModule, FormsModule, LoaderModule],
    declarations: [
        GroupModalDialogComponent,
        GroupsSectionScreenComponent,
        GroupItemScreenComponent,
    ],
    exports: [
        GroupsSectionScreenComponent,
        GroupItemScreenComponent,
        GroupRoutingModule,
        GroupModalDialogComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GroupsModule {}
