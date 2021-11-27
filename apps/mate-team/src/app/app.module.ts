import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ExternalUrlDirective } from './app.external-url.directive';
import { CoreModule } from '@core';
import { FirestoreModule } from '@angular/fire/firestore';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '@env';

@NgModule({
    declarations: [AppComponent, ExternalUrlDirective],
    imports: [
        CoreModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.environment.production,
            registrationStrategy: 'registerWhenStable:30000',
        }),
        AngularFireModule.initializeApp(environment.environment.firebase),
        FirestoreModule,
    ],
    bootstrap: [AppComponent],
    exports: [ExternalUrlDirective]
})
export class AppModule {}
