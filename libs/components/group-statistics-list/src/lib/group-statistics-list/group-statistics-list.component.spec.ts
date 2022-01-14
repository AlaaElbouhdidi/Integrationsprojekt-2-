import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupStatisticsListComponent } from './group-statistics-list.component';

describe('GroupStatisticsListComponent', () => {
  let component: GroupStatisticsListComponent;
  let fixture: ComponentFixture<GroupStatisticsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupStatisticsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupStatisticsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
