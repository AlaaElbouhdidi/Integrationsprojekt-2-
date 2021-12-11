import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@core';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '@env';
import { SocketIoModule } from 'ngx-socket-io';
import { socketConfig } from './app.module';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [
                HttpClientModule,
                RouterTestingModule,
                CoreModule,
                AngularFireModule.initializeApp(environment.firebase),
                SocketIoModule.forRoot(socketConfig)
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
