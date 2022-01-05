import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventFormComponent } from './create-event-form.component';
import { AbstractControl } from '@angular/forms';
import { CreateEventFormModule } from '../create-event-form.module';

describe('CreateEventFormComponent', () => {
    let component: CreateEventFormComponent;
    let fixture: ComponentFixture<CreateEventFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateEventFormModule]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateEventFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return abstract control of name, date and description', () => {
        expect(component.name).toBeInstanceOf(AbstractControl);
        expect(component.date).toBeInstanceOf(AbstractControl);
        expect(component.description).toBeInstanceOf(AbstractControl);
    });

    it('should render two input elements and one textarea element', () => {
        const form = fixture.debugElement.nativeElement.querySelector('form');
        const input = form.querySelectorAll('input');
        const textarea = form.querySelectorAll('textarea');
        expect(input.length).toEqual(2);
        expect(textarea.length).toEqual(1);
    });

    it('should emit event on form submit', () => {
        jest.spyOn(component.createEventEvent,'emit');
        component.createEvent();
        expect(component.createEventEvent.emit).toHaveBeenCalled();
    });
});
