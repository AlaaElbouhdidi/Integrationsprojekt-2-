import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from '@header';
import { LoaderModule } from '@loader';
import { RegisterModule } from '@register';
import { RegisterFormModule } from '@register-form';
import { AlertModule } from '@alert';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '@services';
import {
    FontAwesomeModule,
    FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
    faEnvelope,
    faLock,
    faExclamationCircle,
    faCheckCircle,
    faTimesCircle,
    faExclamationTriangle,
    faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { LoginModule } from '@login';

import { LandingpageModule } from '@landingpage';
import { FooterModule } from '@footer';

@NgModule({
    declarations: [AppComponent],
    imports: [
        LoaderModule,
        RegisterModule,
        LoginModule,
        RegisterFormModule,
        AlertModule,
        CommonModule,
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        NgbModule,
        FontAwesomeModule,
        HttpClientModule,
        AppRoutingModule,
        AngularFireFunctionsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.environment.production,
            registrationStrategy: 'registerWhenStable:30000',
        }),
        AngularFireModule.initializeApp(environment.environment.firebase),
        AngularFireAuthModule,
        FooterModule,
        HeaderModule,
        LandingpageModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [AngularFireAuth, AuthService],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faEnvelope,
            faLock,
            faExclamationCircle,
            faCheckCircle,
            faTimesCircle,
            faExclamationTriangle,
            faUserCircle
        );
    }
}
