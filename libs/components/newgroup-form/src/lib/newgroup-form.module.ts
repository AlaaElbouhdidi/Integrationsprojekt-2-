import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewgroupFormComponent } from './newgroup-form/newgroup-form.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      NewgroupFormComponent
    ],
    exports: [
      NewgroupFormComponent
    ],
})
export class NewgroupFormModule {}
