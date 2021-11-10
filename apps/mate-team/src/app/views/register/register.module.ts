import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
    faEnvelope,
    faLock,
    faExclamationCircle,
    faCheckCircle,
    faTimesCircle,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { LoaderComponent } from '../../components/loader/loader.component';
import { GlobalAlertComponent } from '../../components/global-alert/global-alert.component';

@NgModule({
  declarations: [
      RegisterComponent,
      RegisterFormComponent,
      LoaderComponent,
      GlobalAlertComponent,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
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
