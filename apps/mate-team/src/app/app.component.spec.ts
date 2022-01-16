import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from './app.module';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

describe('AppComponent', () => {
    const angularFireAuthMock = {
        authState: of({ getIdToken: jest.fn() })
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                AngularFireAuth,
                { provide: AngularFireAuth, useValue: angularFireAuthMock }
            ],
            imports: [AppModule, RouterTestingModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
