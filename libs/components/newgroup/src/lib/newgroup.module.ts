import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { NewgroupComponent } from './newgroup/newgroup.component';
import { NewgroupRoutingModule } from './newgroup/newgroup-routing.module';
import { NewgroupFormModule } from '@newgroup-form';

export const newgroupRoutes: Route[] = [];

@NgModule({
    imports: [CommonModule, RouterModule, NewgroupRoutingModule, NewgroupFormModule],
    declarations: [
      NewgroupComponent
    ],
    exports: [
      NewgroupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NewgroupModule {}
