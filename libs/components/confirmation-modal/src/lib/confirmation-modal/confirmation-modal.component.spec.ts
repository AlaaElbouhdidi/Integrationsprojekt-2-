import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationModalComponent } from './confirmation-modal.component';
import { ConfirmationModalModule } from '../confirmation-modal.module';

describe('ConfirmationModalComponent', () => {
    let component: ConfirmationModalComponent;
    let fixture: ComponentFixture<ConfirmationModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ConfirmationModalModule]
    })
    .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmationModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit close modal event on confirm button click', () => {
        jest.spyOn(component.closeModalEvent, 'emit');
        const confirmButton = fixture.debugElement.nativeElement.querySelector('.modal-footer-green-btn');
        confirmButton.click();
        expect(component.closeModalEvent.emit).toHaveBeenCalledWith(true);
    });

    it('should emit dismiss modal event on cancel button click', () => {
        jest.spyOn(component.dismissModalEvent, 'emit');
        const cancelButton = fixture.debugElement.nativeElement.querySelector('.modal-footer-red-btn');
        cancelButton.click();
        expect(component.dismissModalEvent.emit).toHaveBeenCalled();
    });

    it('should emit dismiss modal event on icon click', () => {
        jest.spyOn(component.dismissModalEvent, 'emit');
        const icon = fixture.debugElement.nativeElement.querySelector('#close-confirmation-modal-icon');
        icon.click();
        expect(component.dismissModalEvent.emit).toHaveBeenCalled();
    });
});
