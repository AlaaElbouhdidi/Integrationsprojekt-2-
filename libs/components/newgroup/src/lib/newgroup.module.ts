import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewgroupComponent } from './newgroup/newgroup.component';
import { NewgroupRoutingModule } from './newgroup/newgroup-routing.module';
import { NewgroupFormModule } from '@newgroup-form';
import { NewgroupSuccessModule } from '@newgroup-success';
import { AlertModule } from '@alert';

@NgModule({
    imports: [
        CommonModule,
        NewgroupRoutingModule,
        NewgroupFormModule,
        NewgroupSuccessModule,
        AlertModule
    ],
    declarations: [NewgroupComponent],
    exports: [NewgroupComponent]
})
export class NewgroupModule {}
