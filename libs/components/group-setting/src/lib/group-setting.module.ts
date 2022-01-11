import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupSettingComponent } from './group-setting/group-setting.component';
import {
  FontAwesomeModule,
  FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
  faEdit,
  faTrash,
  faExclamationCircle,
  faInfo
} from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
    declarations: [
      GroupSettingComponent
    ],
    exports: [
      GroupSettingComponent
    ]
})
export class GroupSettingModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTrash, faEdit, faExclamationCircle, faInfo);
}
}
