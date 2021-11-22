import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsGroupsPageMobileComponent } from './events-groups-page-mobile.component';

describe('EventsGroupsPageComponent', () => {
    let component: EventsGroupsPageMobileComponent;
    let fixture: ComponentFixture<EventsGroupsPageMobileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EventsGroupsPageMobileComponent],
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
