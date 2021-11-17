import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsGroupItemScreenComponent } from './events-group-item-screen.component';

describe('EventsGroupItemScreenComponent', () => {
    let component: EventsGroupItemScreenComponent;
    let fixture: ComponentFixture<EventsGroupItemScreenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EventsGroupItemScreenComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsGroupItemScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
