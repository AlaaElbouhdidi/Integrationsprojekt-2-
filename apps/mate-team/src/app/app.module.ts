import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core';
import { AngularFireModule } from '@angular/fire/compat';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CoreModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.environment.production,
            registrationStrategy: 'registerWhenStable:30000',
        }),
        AngularFireModule.initializeApp(environment.environment.firebase),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
