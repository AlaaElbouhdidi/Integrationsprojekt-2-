import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupModalDialogComponent } from './group-modal-dialog/group-modal-dialog.component';
import { GroupSectionMobileComponent } from './group-section-mobile/group-section-mobile.component';
import { GroupsSectionScreenComponent } from './groups-section-screen/groups-section-screen.component';
import { GroupItemScreenComponent } from './group-item-screen/group-item-screen.component';
import { GroupItemMobileComponent } from './group-item-mobile/group-item-mobile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GroupDetailViewComponent } from './group-detail-view/group-detail-view.component';
import { GroupMemberItemComponent } from './group-member-item/group-member-item.component';
import {GroupRoutingModule} from "./group-routing.module";
import { SearchInputFieldComponent } from './search-input-field/search-input-field.component';
import { GroupMemberEditModalDialogComponent } from './group-member-edit-modal-dialog/group-member-edit-modal-dialog.component';
import {LoaderModule} from "@loader";

@NgModule({
    imports: [CommonModule, HttpClientModule, FormsModule, LoaderModule],
    declarations: [
        GroupModalDialogComponent,
        GroupSectionMobileComponent,
        GroupsSectionScreenComponent,
        GroupItemScreenComponent,
        GroupItemMobileComponent,
        GroupDetailViewComponent,
        GroupMemberItemComponent,
        SearchInputFieldComponent,
        GroupMemberEditModalDialogComponent,
    ],
    exports: [GroupSectionMobileComponent, GroupsSectionScreenComponent, GroupDetailViewComponent, GroupRoutingModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GroupsModule {}
