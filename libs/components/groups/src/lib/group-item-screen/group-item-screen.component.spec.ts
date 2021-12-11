import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupItemScreenComponent } from './group-item-screen.component';

describe('GroupItemScreenComponent', () => {
    let component: GroupItemScreenComponent;
    let fixture: ComponentFixture<GroupItemScreenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GroupItemScreenComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupItemScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
