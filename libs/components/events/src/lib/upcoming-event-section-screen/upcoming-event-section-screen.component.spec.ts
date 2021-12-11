import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { UpcomingEventSectionScreenComponent } from './upcoming-event-section-screen.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UpcomingEventSectionScreenComponent', () => {
    let component: UpcomingEventSectionScreenComponent;
    let fixture: ComponentFixture<UpcomingEventSectionScreenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UpcomingEventSectionScreenComponent],
            imports: [FormsModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UpcomingEventSectionScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
