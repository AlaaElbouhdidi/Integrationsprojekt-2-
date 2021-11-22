import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupModalDialogComponent } from './group-modal-dialog/group-modal-dialog.component';
import { GroupSectionMobileComponent } from './group-section-mobile/group-section-mobile.component';
import { GroupsSectionScreenComponent } from './groups-section-screen/groups-section-screen.component';
import { GroupItemScreenComponent } from './group-item-screen/group-item-screen.component';
import { GroupItemMobileComponent } from './group-item-mobile/group-item-mobile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, HttpClientModule, FormsModule],
    declarations: [
        GroupModalDialogComponent,
        GroupSectionMobileComponent,
        GroupsSectionScreenComponent,
        GroupItemScreenComponent,
        GroupItemMobileComponent,
    ],
    exports: [GroupSectionMobileComponent, GroupsSectionScreenComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GroupsModule {}
