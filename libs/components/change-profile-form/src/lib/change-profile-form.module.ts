import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeProfileFormComponent } from './change-profile-form/change-profile-form.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      ChangeProfileFormComponent
    ],
    exports: [
        ChangeProfileFormComponent
    ]
})
export class ChangeProfileFormModule {}
