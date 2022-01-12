import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventFormComponent } from './edit-event-form.component';
import { EditEventFormModule } from '../edit-event-form.module';
import { AbstractControl } from '@angular/forms';

describe('EditEventFormComponent', () => {
    let component: EditEventFormComponent;
    let fixture: ComponentFixture<EditEventFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditEventFormModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditEventFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return abstract control of name, date, description and done', () => {
        expect(component.name).toBeInstanceOf(AbstractControl);
        expect(component.date).toBeInstanceOf(AbstractControl);
        expect(component.description).toBeInstanceOf(AbstractControl);
        expect(component.done).toBeInstanceOf(AbstractControl);
    });

    it('should render three input elements and one textarea element', () => {
        const form = fixture.debugElement.nativeElement.querySelector('form');
        const input = form.querySelectorAll('input');
        const textarea = form.querySelectorAll('textarea');
        expect(input.length).toEqual(3);
        expect(textarea.length).toEqual(1);
    });

    it('should emit event on form submit', () => {
        jest.spyOn(component.editEventEvent, 'emit');
        component.editEvent();
        expect(component.editEventEvent.emit).toHaveBeenCalled();
    });
});
