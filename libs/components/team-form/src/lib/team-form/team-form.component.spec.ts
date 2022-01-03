import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFormComponent } from './team-form.component';
import { TeamFormModule } from '../team-form.module';
import { AbstractControl } from '@angular/forms';

describe('TeamFormComponent', () => {
    let component: TeamFormComponent;
    let fixture: ComponentFixture<TeamFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ TeamFormModule ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TeamFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return name abstract control from form', () => {
        expect(component.name).toBeInstanceOf(AbstractControl);
    });

    it('should render one input element', () => {
        const form =
            fixture.debugElement.nativeElement.querySelector('form');
        const input = form.querySelectorAll('input');
        expect(input.length).toEqual(1);
    });

    it('should set error when name exceeds 15 characters', () => {
        component.name.setValue('testnamewithmorethanfifteencharacters');
        expect(component.name.errors).not.toBeNull();
    });

    it('should emit event on form submit', () => {
        jest.spyOn(component.createTeamEvent, 'emit');
        component.createTeam();
        expect(component.createTeamEvent.emit).toHaveBeenCalled();
    });

    it('should reset form input on submit', () => {
        jest.spyOn(component.teamForm, 'reset');
        component.createTeam();
        expect(component.teamForm.reset).toHaveBeenCalled();
    });
});
