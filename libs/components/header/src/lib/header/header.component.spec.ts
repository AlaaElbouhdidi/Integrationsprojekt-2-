import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@services';
import { of } from 'rxjs';
import { HeaderModule } from '../header.module';
import { Location } from '@angular/common';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    const mockUser = {
        user: {
            email: 'email',
            displayName: '',
        },
    };
    const authServiceMock = {
        authState$: of(mockUser),
        logout: jest.fn(),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: AuthService, useValue: authServiceMock },
            ],
            imports: [RouterTestingModule.withRoutes([]), HeaderModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get user state in constructor', () => {
        authServiceMock.authState$.subscribe((user) => {
            expect(user).toBe(mockUser);
        });
    });

    it('should call auth service logout in component logout method', () => {
        const spy = jest.spyOn(authServiceMock, 'logout');
        component.logout();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should redirect to landing page after successful logout', () => {
        const location = TestBed.inject(Location);
        component.logout().then(() => {
            expect(location.path()).toBe('/');
        });
    });

    it('should unsubscribe from observable on destroy', () => {
        jest.spyOn(component['authSubscription'], 'unsubscribe');
        component.ngOnDestroy();
        expect(component['authSubscription'].unsubscribe).toHaveBeenCalledTimes(
            1
        );
    });
});
