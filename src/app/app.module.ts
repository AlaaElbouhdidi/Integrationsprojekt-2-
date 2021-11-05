import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environments/environment";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { ServiceWorkerModule } from "@angular/service-worker";
import { providePerformance, getPerformance } from "@angular/fire/performance";
import { provideStorage, getStorage } from "@angular/fire/storage";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        ServiceWorkerModule.register("ngsw-worker.js", {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: "registerWhenStable:30000"
        }),
        providePerformance(() => getPerformance()),
        provideStorage(() => getStorage())
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
