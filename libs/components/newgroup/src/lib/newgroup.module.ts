import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { NewgroupComponent } from './newgroup/newgroup.component';
import { NewgroupRoutingModule } from './newgroup/newgroup-routing.module';

export const newgroupRoutes: Route[] = [];

@NgModule({
    imports: [CommonModule, RouterModule, NewgroupRoutingModule],
    declarations: [
      NewgroupComponent
    ],
    exports: [
      NewgroupComponent
    ],
})
export class NewgroupModule {}
