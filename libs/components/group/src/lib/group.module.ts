import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group/group.component';
import { GroupRoutingModule } from './group/group-routing.module';

@NgModule({
    imports: [CommonModule, GroupRoutingModule],
    declarations: [GroupComponent],
    exports: [GroupComponent]
})
export class GroupModule {}
