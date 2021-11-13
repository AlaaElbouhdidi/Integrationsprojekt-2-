import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginFormModule } from '@integrationsprojekt2/login-form';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';

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

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            FontAwesomeModule,
            LoginFormModule,
            RouterTestingModule.withRoutes([]),
            AngularFireModule.initializeApp(environment.firebase),
        ],
        providers: [],
        declarations: [ LoginFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
      fixture = TestBed.createComponent(LoginFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
