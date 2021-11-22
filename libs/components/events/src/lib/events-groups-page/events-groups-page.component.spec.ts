import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsGroupsPageComponent } from './events-groups-page.component';
import { EventsGroupsPageScreenComponent } from '../events-groups-page-screen/events-groups-page-screen.component';
import { EventsGroupsPageMobileComponent } from '../events-groups-page-mobile/events-groups-page-mobile.component';

describe('EventsGroupsPageComponent', () => {
    let component: EventsGroupsPageComponent;
    let fixture: ComponentFixture<EventsGroupsPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                EventsGroupsPageComponent,
                EventsGroupsPageScreenComponent,
                EventsGroupsPageMobileComponent,
            ],
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
