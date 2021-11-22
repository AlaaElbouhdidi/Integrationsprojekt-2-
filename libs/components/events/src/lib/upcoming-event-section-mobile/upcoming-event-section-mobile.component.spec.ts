import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { UpcomingEventSectionMobileComponent } from './upcoming-event-section-mobile.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('UpcomingEventSectionMobileComponent', () => {
    let component: UpcomingEventSectionMobileComponent;
    let fixture: ComponentFixture<UpcomingEventSectionMobileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ UpcomingEventSectionMobileComponent ],
            imports: [FormsModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UpcomingEventSectionMobileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
