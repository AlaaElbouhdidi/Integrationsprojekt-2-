import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupStatisticsComponent } from './group-statistics/group-statistics.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      GroupStatisticsComponent
    ],
    exports: [GroupStatisticsComponent]
})
export class GroupStatisticsModule {}
