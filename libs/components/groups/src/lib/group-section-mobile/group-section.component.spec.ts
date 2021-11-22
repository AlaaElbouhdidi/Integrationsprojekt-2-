import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSectionMobileComponent } from './group-section-mobile.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('GroupSectionComponent', () => {
    let component: GroupSectionMobileComponent;
    let fixture: ComponentFixture<GroupSectionMobileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GroupSectionMobileComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
