import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterFormComponent } from './register-form.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { RegisterFormModule } from '../register-form.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@env';

describe('RegisterFormComponent', () => {
    let component: RegisterFormComponent;
    let fixture: ComponentFixture<RegisterFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FontAwesomeModule,
                RegisterFormModule,
                RouterTestingModule.withRoutes([]),
                AngularFireModule.initializeApp(environment.environment.firebase),
            ],
            providers: [AngularFireAuth],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
