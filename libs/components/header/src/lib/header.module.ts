import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import {
    FontAwesomeModule,
    FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import { faUserCircle, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { UserIconModule } from '@user-icon';
import { StylesModule } from '@styles';

@NgModule({
    imports: [CommonModule, RouterModule, FontAwesomeModule, StylesModule, UserIconModule],
    declarations: [HeaderComponent],
    exports: [HeaderComponent]
})
export class HeaderModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faUserCircle, faLayerGroup);
    }
}
