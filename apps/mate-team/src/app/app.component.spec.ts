import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderModule } from '@integrationsprojekt2/header';
import { AngularFireModule } from '@angular/fire/compat';

export const environment = {
    firebase: {
        projectId: 'integrationsprojekt2',
        appId: '1:229229352898:web:a91515cba0a9a9c03a285b',
        storageBucket: 'integrationsprojekt2.appspot.com',
        apiKey: 'AIzaSyCD5MCtKyB5iUyzB2H_wYLShwTp9f1H-Ks',
        authDomain: 'integrationsprojekt2.firebaseapp.com',
        messagingSenderId: '229229352898',
    },
    production: false,
    apiUrl: 'http://localhost:5001/integrationsprojekt2/europe-west1/api',
};

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [
                HttpClientModule,
                RouterTestingModule,
                HeaderModule,
                AngularFireModule.initializeApp(environment.firebase),
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
