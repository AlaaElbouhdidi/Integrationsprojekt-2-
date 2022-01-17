import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventModalComponent } from './create-event-modal.component';
import { CreateEventModalModule } from '../create-event-modal.module';

describe('CreateEventModalComponent', () => {
    let component: CreateEventModalComponent;
    let fixture: ComponentFixture<CreateEventModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateEventModalModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateEventModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit dismiss modal event on icon click', () => {
        jest.spyOn(component.dismissModalEvent, 'emit');
        const icon = fixture.debugElement.nativeElement.querySelector(
            '#dismiss-modal-icon'
        );
        icon.click();
        expect(component.dismissModalEvent.emit).toHaveBeenCalled();
    });
});
