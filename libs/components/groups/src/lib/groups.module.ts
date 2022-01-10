import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups/groups.component';
import { ServicesModule } from '@services';

@NgModule({
    imports: [CommonModule, ServicesModule],
    declarations: [GroupsComponent],
    exports: [GroupsComponent]
})
export class GroupsModule {}
