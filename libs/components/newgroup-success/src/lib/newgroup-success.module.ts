import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewgroupSuccessComponent } from './newgroup-success.component';

import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AlertModule } from '@alert';

@NgModule({
    imports: [CommonModule, MatChipsModule, MatFormFieldModule, MatIconModule, AlertModule, RouterModule],
    declarations: [NewgroupSuccessComponent],
    exports: [NewgroupSuccessComponent]
})
export class NewgroupSuccessModule {}
