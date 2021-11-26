import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRoutingModule } from './profile/profile-routing.module';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
    faUser,
    faEnvelope,
    faCertificate,
    faCheckCircle,
    faTimesCircle,
    faLock,
    faLink,
    faEdit
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        FontAwesomeModule
    ],
    declarations: [
      ProfileComponent
    ],
    exports: [ProfileComponent]
})
export class ProfileModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faUser,
            faEnvelope,
            faCertificate,
            faCheckCircle,
            faTimesCircle,
            faLock,
            faLink,
            faEdit
        );
    }
}
