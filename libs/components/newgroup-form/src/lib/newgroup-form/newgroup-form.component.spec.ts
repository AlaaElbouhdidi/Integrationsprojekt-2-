import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewgroupFormComponent } from './newgroup-form.component';

describe('NewgroupFormComponent', () => {
  let component: NewgroupFormComponent;
  let fixture: ComponentFixture<NewgroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewgroupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewgroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
