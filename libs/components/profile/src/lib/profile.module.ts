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
    faUserTag
} from '@fortawesome/free-solid-svg-icons';
import { ChangePasswordFormModule } from '../../../change-password-form/src';
import { ChangeEmailFormModule } from '@change-email-form';

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        ChangePasswordFormModule,
        ChangeEmailFormModule,
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
            faUserTag
        );
    }
}
