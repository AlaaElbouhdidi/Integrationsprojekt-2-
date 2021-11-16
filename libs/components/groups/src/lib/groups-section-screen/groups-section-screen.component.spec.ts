import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsSectionScreenComponent } from './groups-section-screen.component';

describe('GroupsSectionScreenComponent', () => {
  let component: GroupsSectionScreenComponent;
  let fixture: ComponentFixture<GroupsSectionScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsSectionScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsSectionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
