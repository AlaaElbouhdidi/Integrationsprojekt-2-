import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EventsGroupsPageComponent} from './events-groups-page.component';
import {EventsGroupsPageScreenComponent} from '../events-groups-page-screen/events-groups-page-screen.component';
import {EventsGroupsPageMobileComponent} from '../events-groups-page-mobile/events-groups-page-mobile.component';
import {UpcomingEventSectionMobileComponent} from "../upcoming-event-section-mobile/upcoming-event-section-mobile.component";
import {GroupsModule} from "@groups";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('EventsGroupsPageComponent', () => {
    let component: EventsGroupsPageComponent;
    let fixture: ComponentFixture<EventsGroupsPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                EventsGroupsPageComponent,
                EventsGroupsPageScreenComponent,
                EventsGroupsPageMobileComponent,
                UpcomingEventSectionMobileComponent,
            ],
            imports: [GroupsModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsGroupsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
