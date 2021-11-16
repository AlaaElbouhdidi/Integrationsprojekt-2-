import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthHandlerComponent } from './auth-handler.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '@env';

describe('AuthHandlerComponent', () => {
  let component: AuthHandlerComponent;
  let fixture: ComponentFixture<AuthHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            RouterTestingModule.withRoutes([]),
            AngularFireModule.initializeApp(environment.environment.firebase)
        ],
        declarations: [ AuthHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
