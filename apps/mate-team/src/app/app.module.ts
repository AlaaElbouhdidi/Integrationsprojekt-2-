import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ExternalUrlDirective } from './app.external-url.directive';
import { CoreModule } from '@core';
import { FirestoreModule } from '@angular/fire/firestore';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '@env';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const socketConfig: SocketIoConfig = {
    url: environment.clientUrl,
    options: {
        transportOptions: {
            polling: {
                extraHeaders: {
                    Authorization: localStorage
                        .getItem('idToken')
                        ?.replace('"', ''),
                },
            },
        },
    },
};

@NgModule({
    declarations: [AppComponent, ExternalUrlDirective],
    imports: [
        CoreModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerWhenStable:30000',
        }),
        AngularFireModule.initializeApp(environment.firebase),
        FirestoreModule,
        SocketIoModule.forRoot(socketConfig),
        BrowserAnimationsModule,
    ],
    bootstrap: [AppComponent],
    exports: [ExternalUrlDirective],
})
export class AppModule {}
