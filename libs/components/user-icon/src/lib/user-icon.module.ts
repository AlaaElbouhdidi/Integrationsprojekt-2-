import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserIconComponent } from './user-icon/user-icon.component';
import {
    FontAwesomeModule,
    FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [CommonModule, FontAwesomeModule],
    declarations: [UserIconComponent],
    exports: [UserIconComponent]
})
export class UserIconModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faUser);
    }
}
