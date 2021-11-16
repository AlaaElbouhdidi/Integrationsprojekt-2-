import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailFormComponent } from './email-form.component';
import { EmailFormModule } from '../email-form.module';
import { environment } from '@env';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('EmailFormComponent', () => {
  let component: EmailFormComponent;
  let fixture: ComponentFixture<EmailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            EmailFormModule,
            FontAwesomeModule,
            RouterTestingModule.withRoutes([]),
            AngularFireModule.initializeApp(environment.environment.firebase)
        ],
        declarations: [ EmailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
