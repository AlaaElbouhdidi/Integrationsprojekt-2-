import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDescriptionModalComponent } from './event-description-modal.component';
import { EventDescriptionModalModule } from '../event-description-modal.module';

describe('EventDescriptionModalComponent', () => {
    let component: EventDescriptionModalComponent;
    let fixture: ComponentFixture<EventDescriptionModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EventDescriptionModalModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EventDescriptionModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit dismiss event on button click', () => {
        jest.spyOn(component.dismissModalEvent, 'emit');
        const button = fixture.debugElement.nativeElement.querySelector(
            '.modal-footer-red-btn'
        );
        button.click();
        expect(component.dismissModalEvent.emit).toHaveBeenCalled();
    });

    it('should emit dismiss event on cross icon click', () => {
        jest.spyOn(component.dismissModalEvent, 'emit');
        const icon = fixture.debugElement.nativeElement.querySelector(
            '#dismiss-modal-icon'
        );
        icon.click();
        expect(component.dismissModalEvent.emit).toHaveBeenCalled();
    });
});
