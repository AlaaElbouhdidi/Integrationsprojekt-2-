import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPollsEventsComponent } from './group-polls-events.component';

describe('GroupPollsEventsComponent', () => {
  let component: GroupPollsEventsComponent;
  let fixture: ComponentFixture<GroupPollsEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupPollsEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPollsEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
