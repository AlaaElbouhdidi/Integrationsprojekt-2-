import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupStatisticsComponent } from './group-statistics.component';

describe('GroupStatisticsComponent', () => {
  let component: GroupStatisticsComponent;
  let fixture: ComponentFixture<GroupStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
