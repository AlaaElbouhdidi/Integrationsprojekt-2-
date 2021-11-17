import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSectionMobileComponent } from './group-section-mobile.component';

describe('GroupSectionComponent', () => {
    let component: GroupSectionMobileComponent;
    let fixture: ComponentFixture<GroupSectionMobileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GroupSectionMobileComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupSectionMobileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
