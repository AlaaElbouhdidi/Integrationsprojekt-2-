import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventItemScreenComponent } from './event-item-screen.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('EventItemScreenComponent', () => {
    let component: EventItemScreenComponent;
    let fixture: ComponentFixture<EventItemScreenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EventItemScreenComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EventItemScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
