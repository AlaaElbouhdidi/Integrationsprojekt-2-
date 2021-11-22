import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventModalDialogComponent } from './event-modal-dialog.component';

describe('EventModalDialogComponent', () => {
  let component: EventModalDialogComponent;
  let fixture: ComponentFixture<EventModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
