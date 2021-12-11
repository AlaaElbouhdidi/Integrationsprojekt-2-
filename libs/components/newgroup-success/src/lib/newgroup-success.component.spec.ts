import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewgroupSuccessComponent } from './newgroup-success.component';

describe('NewgroupSuccessComponent', () => {
    let component: NewgroupSuccessComponent;
    let fixture: ComponentFixture<NewgroupSuccessComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NewgroupSuccessComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NewgroupSuccessComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
