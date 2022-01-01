import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersListItemComponent } from './members-list-item.component';

describe('MembersListItemComponent', () => {
  let component: MembersListItemComponent;
  let fixture: ComponentFixture<MembersListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
