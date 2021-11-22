import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpcomingEventSectionScreenComponent } from '../upcoming-event-section-screen/upcoming-event-section-screen.component';

import { EventsGroupsPageScreenComponent } from './events-groups-page-screen.component';
import {GroupsModule} from "@groups";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('EventsGroupsPageScreenComponent', () => {
    let component: EventsGroupsPageScreenComponent;
    let fixture: ComponentFixture<EventsGroupsPageScreenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EventsGroupsPageScreenComponent, UpcomingEventSectionScreenComponent],
            imports: [GroupsModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsGroupsPageScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

