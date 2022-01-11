import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService, GroupService } from '@services';
import { GroupsModule } from '../groups.module';
import { GroupsComponent } from './groups.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('GroupsComponent', () => {
    let component: GroupsComponent;
    let fixture: ComponentFixture<GroupsComponent>;
    const groupServiceMock = {
        getUserGroups: jest.fn()
    };
    const authServiceMock = {
        getCurrentUser: jest.fn().mockReturnValue({ uid: 'userId' })
    };
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GroupsModule, RouterTestingModule.withRoutes([])],
            providers: [
                { provide: GroupService, useValue: groupServiceMock },
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
