import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePollFormComponent } from './create-poll-form.component';
import { AbstractControl } from '@angular/forms';
import { CreatePollFormModule } from '../create-poll-form.module';

describe('CreatePollFormComponent', () => {
    let component: CreatePollFormComponent;
    let fixture: ComponentFixture<CreatePollFormComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [CreatePollFormModule]
    })
    .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreatePollFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return abstract control of title and date', () => {
        expect(component.title).toBeInstanceOf(AbstractControl);
        expect(component.date).toBeInstanceOf(AbstractControl);
    });

    it('should render two input elements', () => {
       const form = fixture.debugElement.nativeElement.querySelector('form');
       const input = form.querySelectorAll('input');
       expect(input.length).toEqual(2);
    });

    it('should emit event on form submit', () => {
       jest.spyOn(component.createPollEvent, 'emit');
       component.createPoll();
       expect(component.createPollEvent.emit).toHaveBeenCalled();
    });

    it('should reset form on form submit', () => {
        jest.spyOn(component.createPollForm, 'reset');
        component.createPoll();
        expect(component.createPollForm.reset).toHaveBeenCalled();
    });

    it('should add date as choice', () => {
        expect(component.choices.length).toEqual(0);
        component.addDateAsChoice();
        expect(component.choices.length).toEqual(1);
    });

    it('should remove date from choices', () => {
       component.addDateAsChoice();
       component.deleteDateAsChoice(0);
       expect(component.choices.length).toEqual(0);
    });

    it('should disable button to add choice when five choices are already provided', () => {
        component.choices = [
            { date: '01/02/2022', votes: 0 },
            { date: '01/01/2022', votes: 4 },
            { date: '08/03/2022', votes: 2 },
            { date: '05/09/2022', votes: 7 },
            { date: '09/12/2022', votes: 0 }
        ];
        component.date.setValue('09/12/2022');
        fixture.detectChanges();
        const button = fixture.debugElement.nativeElement.querySelector('#add-poll-choice-btn');
        expect(button.getAttribute('disabled')).toEqual('');
    });

    it('should enable button to add choice when date and less than five choices provided', () => {
        component.date.setValue('09/12/2022');
        fixture.detectChanges();
        const button = fixture.debugElement.nativeElement.querySelector('#add-poll-choice-btn');
        expect(button.getAttribute('disabled')).toEqual(null);
    });

    it('should disable submit button when no choice is provided', () => {
        component.title.setValue('poll');
        fixture.detectChanges();
        const button = fixture.debugElement.nativeElement.querySelector('#create-poll-submit-btn');
        expect(button.getAttribute('disabled')).toEqual('');
    });

    it('should enable submit button when at least one choice is given and a title is provided', () => {
        component.choices = [
            { date: '01/02/2022', votes: 0 }
        ];
        component.title.setValue('poll');
        fixture.detectChanges();
        const button = fixture.debugElement.nativeElement.querySelector('#create-poll-submit-btn');
        expect(button.getAttribute('disabled')).toEqual(null);
    });
});
