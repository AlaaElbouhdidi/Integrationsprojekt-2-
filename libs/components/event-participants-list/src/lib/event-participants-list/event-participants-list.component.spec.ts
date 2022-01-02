import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventParticipantsListComponent } from './event-participants-list.component';

describe('EventParticipantsListComponent', () => {
  let component: EventParticipantsListComponent;
  let fixture: ComponentFixture<EventParticipantsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventParticipantsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventParticipantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
