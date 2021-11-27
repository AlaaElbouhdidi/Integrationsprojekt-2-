import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import {
    FontAwesomeModule,
    FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [CommonModule, RouterModule, FontAwesomeModule],
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
})
export class HeaderModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faUserCircle);
    }
}
