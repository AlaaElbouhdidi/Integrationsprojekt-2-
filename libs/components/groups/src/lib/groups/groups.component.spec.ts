import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService, EventService, GroupService, UserService } from '@services';
import { GroupsModule } from '../groups.module';
import { GroupsComponent } from './groups.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { User } from '@api-interfaces';

describe('GroupsComponent', () => {
    let component: GroupsComponent;
    let fixture: ComponentFixture<GroupsComponent>;
    const groupServiceMock = {
        getUserGroups: jest.fn(),
        getUserInvitations: jest.fn(),
        declineUserGroupInvitation: jest.fn(),
        acceptUserGroupInvitation: jest.fn,
        userDataChanges: jest.fn().mockReturnValue(of({} as User))
    };
    const authServiceMock = {
        getCurrentUser: jest.fn().mockReturnValue({ uid: 'userId' })
    };
    const eventServiceMock = {
        getUpcomingEvents: jest.fn().mockReturnValue(of([]))
    };
    const userServiceMock = {
        getUserByUid: jest.fn()
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                GroupsModule,
                RouterTestingModule.withRoutes([]),
                BrowserAnimationsModule
            ],
            providers: [
                { provide: GroupService, useValue: groupServiceMock },
                { provide: EventService, useValue: eventServiceMock },
                { provide: AuthService, useValue: authServiceMock },
                { provide: UserService, useValue: userServiceMock }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
