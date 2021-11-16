import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetFormComponent } from './password-reset-form.component';
import { PasswordResetFormModule } from '../password-reset-form.module';

describe('PasswordResetFormComponent', () => {
  let component: PasswordResetFormComponent;
  let fixture: ComponentFixture<PasswordResetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [ PasswordResetFormModule ],
        declarations: [ PasswordResetFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
