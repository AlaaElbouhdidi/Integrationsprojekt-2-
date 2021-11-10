import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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

describe('AuthServiceService', () => {
    let service: AuthService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AngularFireModule.initializeApp(environment.firebase)],
            providers: [AngularFireAuth],
        });
        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
