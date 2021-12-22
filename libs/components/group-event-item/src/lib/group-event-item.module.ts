import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupEventItemComponent } from './group-event-item/group-event-item.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      GroupEventItemComponent
    ],
    exports: [GroupEventItemComponent]
})
export class GroupEventItemModule {}
