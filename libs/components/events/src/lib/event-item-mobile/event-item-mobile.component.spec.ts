import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventItemMobileComponent } from './event-item-mobile.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('EventItemMobileComponent', () => {
    let component: EventItemMobileComponent;
    let fixture: ComponentFixture<EventItemMobileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ EventItemMobileComponent ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EventItemMobileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
