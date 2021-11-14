import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '@env';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from '@services';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { CoreModule } from '@core';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CoreModule,
        CommonModule,
        AppRoutingModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        NgbModule,
        HttpClientModule,
        AngularFireFunctionsModule,
        AngularFireAuthModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.environment.production,
            registrationStrategy: 'registerWhenStable:30000',
        }),
        AngularFireModule.initializeApp(environment.environment.firebase),
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [AngularFireAuth, AuthService],
    bootstrap: [AppComponent],
})
export class AppModule {}
