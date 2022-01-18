import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService, EventService, GroupService } from '@services';
import { GroupsModule } from '../groups.module';
import { GroupsComponent } from './groups.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GroupsComponent', () => {
    let component: GroupsComponent;
    let fixture: ComponentFixture<GroupsComponent>;
    const groupServiceMock = {
        getUserGroups: jest.fn(),
        getUserInvitations: jest.fn(),
        declineUserGroupInvitation: jest.fn(),
        acceptUserGroupInvitation: jest.fn
    };
    const authServiceMock = {
        getCurrentUser: jest.fn().mockReturnValue({ uid: 'userId' })
    };
    const eventServiceMock = {
        getUpcomingEvents: jest.fn()
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
                { provide: AuthService, useValue: authServiceMock }
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
