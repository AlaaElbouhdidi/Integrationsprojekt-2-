import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupService } from '@services';
import { GroupsModule } from '../groups.module';
import { GroupsComponent } from './groups.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('GroupsComponent', () => {
    let component: GroupsComponent;
    let fixture: ComponentFixture<GroupsComponent>;
    const groupServiceMock = {
        getUserGroups: jest.fn()
    };
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GroupsModule, RouterTestingModule.withRoutes([])],
            providers: [{ provide: GroupService, useValue: groupServiceMock }]
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
