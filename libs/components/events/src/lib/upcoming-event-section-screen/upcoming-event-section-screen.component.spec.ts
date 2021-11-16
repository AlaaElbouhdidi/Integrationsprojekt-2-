import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingEventSectionScreenComponent } from './upcoming-event-section-screen.component';

describe('UpcomingEventSectionScreenComponent', () => {
  let component: UpcomingEventSectionScreenComponent;
  let fixture: ComponentFixture<UpcomingEventSectionScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingEventSectionScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingEventSectionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
