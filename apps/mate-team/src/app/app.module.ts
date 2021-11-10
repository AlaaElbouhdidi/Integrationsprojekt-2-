import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from '@integrationsprojekt2/header';
import { LoaderModule } from '@integrationsprojekt2/loader';
import { RegisterModule } from '@integrationsprojekt2/register';
import { RegisterFormModule } from '@integrationsprojekt2/register-form';
import { AlertModule } from '@integrationsprojekt2/alert';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '@integrationsprojekt2/services';
import { FontAwesomeModule, FaIconLibrary, } from '@fortawesome/angular-fontawesome';
import {
    faEnvelope,
    faLock,
    faExclamationCircle,
    faCheckCircle,
    faTimesCircle,
    faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';


@NgModule({
    declarations: [AppComponent],
    imports: [
        HeaderModule,
        LoaderModule,
        RegisterModule,
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
            enabled: environment.production,
            registrationStrategy: 'registerWhenStable:30000',
        }),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
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
            faExclamationTriangle
        );
    }
}
