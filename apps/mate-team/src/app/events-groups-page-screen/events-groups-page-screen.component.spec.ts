import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsGroupsPageScreenComponent } from './events-groups-page-screen.component';

describe('EventsGroupsPageScreenComponent', () => {
  let component: EventsGroupsPageScreenComponent;
  let fixture: ComponentFixture<EventsGroupsPageScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsGroupsPageScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsGroupsPageScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
