import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {GroupStatisticsRoutingModule} from './group-statistics/group-statistics-routing.module'
import { GroupStatisticsComponent } from './group-statistics/group-statistics.component';

@NgModule({
    imports: [CommonModule, GroupStatisticsRoutingModule],
    declarations: [
      GroupStatisticsComponent
    ],
    exports: [GroupStatisticsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GroupStatisticsModule {}
