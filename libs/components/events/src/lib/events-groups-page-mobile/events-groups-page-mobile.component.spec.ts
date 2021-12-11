import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsGroupsPageMobileComponent } from './events-groups-page-mobile.component';
import { UpcomingEventSectionMobileComponent } from '../upcoming-event-section-mobile/upcoming-event-section-mobile.component';
import { GroupsModule } from '@groups';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EventsGroupsPageComponent', () => {
    let component: EventsGroupsPageMobileComponent;
    let fixture: ComponentFixture<EventsGroupsPageMobileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                EventsGroupsPageMobileComponent,
                UpcomingEventSectionMobileComponent
            ],
            imports: [GroupsModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsGroupsPageMobileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
