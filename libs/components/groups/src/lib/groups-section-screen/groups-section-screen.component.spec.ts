import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { GroupsSectionScreenComponent } from './groups-section-screen.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('GroupsSectionScreenComponent', () => {
    let component: GroupsSectionScreenComponent;
    let fixture: ComponentFixture<GroupsSectionScreenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GroupsSectionScreenComponent],
            imports: [FormsModule, RouterTestingModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
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
