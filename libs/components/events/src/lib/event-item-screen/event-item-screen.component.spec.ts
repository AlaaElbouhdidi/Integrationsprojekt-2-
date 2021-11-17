import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventItemScreenComponent } from './event-item-screen.component';

describe('EventItemScreenComponent', () => {
    let component: EventItemScreenComponent;
    let fixture: ComponentFixture<EventItemScreenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EventItemScreenComponent],
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
