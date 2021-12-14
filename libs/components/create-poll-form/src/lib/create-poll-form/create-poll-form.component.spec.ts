import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePollFormComponent } from './create-poll-form.component';

describe('CreatePollFormComponent', () => {
  let component: CreatePollFormComponent;
  let fixture: ComponentFixture<CreatePollFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePollFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePollFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
