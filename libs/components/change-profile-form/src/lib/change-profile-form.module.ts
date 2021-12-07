import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeProfileFormComponent } from './change-profile-form/change-profile-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
    FontAwesomeModule,
    FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
    faUserTag,
    faTint,
    faFill,
    faChevronLeft,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { UserIconModule } from '@user-icon';
import { LoaderModule } from '@loader';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        UserIconModule,
        LoaderModule
    ],
    declarations: [ChangeProfileFormComponent],
    exports: [ChangeProfileFormComponent]
})
export class ChangeProfileFormModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faUserTag,
            faTint,
            faFill,
            faChevronLeft,
            faChevronRight
        );
    }
}
