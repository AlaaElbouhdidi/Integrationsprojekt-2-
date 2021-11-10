import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    FontAwesomeModule,
    FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { RegisterRoutingModule } from './register/register-routing.module';
import { RegisterComponent } from './register/register.component';
import { RegisterFormModule } from '@integrationsprojekt2/register-form';
import { LoaderModule } from '@integrationsprojekt2/loader';
import { AlertModule } from '@integrationsprojekt2/alert';
import {
    faEnvelope,
    faLock,
    faExclamationCircle,
    faCheckCircle,
    faTimesCircle,
    faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        AlertModule,
        CommonModule,
        RegisterRoutingModule,
        RegisterFormModule,
        LoaderModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
    ],
    exports: [RegisterComponent],
})
export class RegisterModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faEnvelope,
            faLock,
            faExclamationCircle,
            faCheckCircle,
            faTimesCircle,
            faExclamationTriangle
        );
    }
}
