import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { of } from 'rxjs';
import { ProfileModule } from '../profile.module';
import { AuthService, UserService } from '@services';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;
    const mockUser = {
        email: 'mail@example.com',
        displayName: 'Max',
        emailVerified: false,
        photoURL: undefined
    };
    const authServiceMock = {
        user: {
            providerData: [{ providerId: 'password' }]
        },
        authState$: of(mockUser),
        reauthenticateUser: jest.fn(),
        updatePassword: jest.fn(),
        updateEmail: jest.fn(),
        updateProfile: jest.fn()
    };
    const userServiceMock = {
        user: {
            providerData: [{ providerId: 'password' }]
        },
        getUser: jest.fn(),
        updateProfile: jest.fn()
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: AuthService, useValue: authServiceMock },

                UserService,
                { provide: UserService, useValue: userServiceMock }
            ],
            imports: [ProfileModule, BrowserAnimationsModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should subscribe to authState$ on init', () => {
        const spy = jest.spyOn(authServiceMock['authState$'], 'subscribe');
        component.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });

    it('should get user on component init', () => {
        component.ngOnInit();
        expect(component.user).toBe(mockUser);
    });

    it('should render the display name of the user', () => {
        const el: HTMLParagraphElement =
            fixture.debugElement.nativeElement.querySelector(
                '.profile-user-name p'
            );
        expect(el.textContent).toContain(component.user?.displayName);
    });

    it('should not render image when no url provided', () => {
        expect(component.user?.photoURL).toBeUndefined();
        expect(fixture.debugElement.query(By.css('img'))).toBeNull();
    });

    it('should render times circle icon if email not verified', () => {
        const icon = fixture.debugElement.nativeElement.querySelector(
            'fa-icon[icon="times-circle"]'
        );
        expect(icon).not.toBeNull();
    });

    it('should unsubscribe from observable on component destroy', () => {
        jest.spyOn(component['destroy$'], 'complete');
        component.ngOnDestroy();
        expect(component['destroy$'].complete).toHaveBeenCalledTimes(1);
    });

    it('should check provider and set its id data', () => {
        component.checkProvider();
        expect(component.provider).toEqual('password');
    });

    it('should set the active nav link', () => {
        component.setActiveLink('password');
        expect(component.activeNavLink).toEqual('password');
    });

    it('should call auth service to reauthenticate user before updating the password', () => {
        const reAuthSpy = jest.spyOn(authServiceMock, 'reauthenticateUser');
        component.changePassword({
            oldPassword: 'password',
            newPassword: 'newPassword'
        });
        expect(reAuthSpy).toHaveBeenCalled();
    });

    it('should call auth service to reauthenticate user before updating the email', () => {
        const reAuthSpy = jest.spyOn(authServiceMock, 'reauthenticateUser');
        component.changeEmail({
            password: 'password',
            newEmail: 'test@example.com'
        });
        expect(reAuthSpy).toHaveBeenCalled();
    });

    it('should call auth service to update profile', () => {
        const spy = jest.spyOn(authServiceMock, 'updateProfile');
        component.changeProfile({
            displayName: 'myName',
            photoURL: 'user/#ffffff/#ffffff'
        });
        expect(spy).toHaveBeenCalled();
    });
});
