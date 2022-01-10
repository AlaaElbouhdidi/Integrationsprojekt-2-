import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupsModule } from '../groups.module';

import { GroupsComponent } from './groups.component';

describe('GroupsComponent', () => {
    let component: GroupsComponent;
    let fixture: ComponentFixture<GroupsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GroupsModule]
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
