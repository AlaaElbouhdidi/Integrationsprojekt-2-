import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventModalComponent } from './edit-event-modal.component';
import { EditEventModalModule } from '../edit-event-modal.module';

describe('EditEventModalComponent', () => {
    let component: EditEventModalComponent;
    let fixture: ComponentFixture<EditEventModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditEventModalModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditEventModalComponent);
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
