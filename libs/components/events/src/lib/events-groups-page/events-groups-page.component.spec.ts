import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsGroupsPageComponent } from './events-groups-page.component';

describe('EventsGroupsPageComponent', () => {
  let component: EventsGroupsPageComponent;
  let fixture: ComponentFixture<EventsGroupsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsGroupsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsGroupsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
