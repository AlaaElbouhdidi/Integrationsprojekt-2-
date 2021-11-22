import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupItemMobileComponent } from './group-item-mobile.component';

describe('GroupItemMobileComponent', () => {
    let component: GroupItemMobileComponent;
    let fixture: ComponentFixture<GroupItemMobileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GroupItemMobileComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupItemMobileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

