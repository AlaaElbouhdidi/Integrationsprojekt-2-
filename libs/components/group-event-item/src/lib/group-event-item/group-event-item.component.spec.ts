import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupEventItemComponent } from './group-event-item.component';

describe('GroupEventItemComponent', () => {
  let component: GroupEventItemComponent;
  let fixture: ComponentFixture<GroupEventItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupEventItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupEventItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
