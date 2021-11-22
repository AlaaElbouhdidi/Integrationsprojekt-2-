import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailFormComponent } from './email-form/email-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { LoaderModule } from '@loader';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        LoaderModule
    ],
    declarations: [
      EmailFormComponent
    ],
    exports: [EmailFormComponent]
})
export class EmailFormModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faEnvelope
        )
    }
}
