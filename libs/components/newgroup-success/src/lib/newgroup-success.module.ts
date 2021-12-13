import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewgroupSuccessComponent } from './newgroup-success.component';

import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon'

@NgModule({
    imports: [CommonModule, MatChipsModule, MatFormFieldModule, MatIconModule],
    declarations: [NewgroupSuccessComponent],
    exports: [NewgroupSuccessComponent]
})
export class NewgroupSuccessModule {}
