import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIconComponent } from './user-icon.component';
import { IconService } from '@services';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

describe('UserIconComponent', () => {
    let component: UserIconComponent;
    let fixture: ComponentFixture<UserIconComponent>;
    const user = faUser;

    const iconServiceMock = {
        decodeIconString: jest.fn(),
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                IconService,
                { provide: IconService, useValue: iconServiceMock }
            ],
            imports: [
                FontAwesomeModule
            ],
            declarations: [UserIconComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserIconComponent);
        component = fixture.componentInstance;
        component.icon = user;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not set values when user icon string is empty on init', () => {
        const spy = jest.spyOn(iconServiceMock, 'decodeIconString');
        expect(component.userIconString.length).toBe(0);
        component.ngOnInit();
        expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should not set values when user icon string is empty on changes', () => {
        const spy = jest.spyOn(iconServiceMock, 'decodeIconString');
        expect(component.userIconString.length).toBe(0);
        component.ngOnChanges();
        expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should set icon values', () => {
        const spy = jest.spyOn(iconServiceMock, 'decodeIconString');
        spy.mockReturnValue(['dragon', '#ffffff', '#732a2a']);
        component.setIconValues();
        expect(spy).toHaveBeenCalled();
        expect(component.iconColor).toBe('#ffffff');
        expect(component.iconBackground).toBe('#732a2a');
        expect(component.icon).toBe('dragon');
    });
});
