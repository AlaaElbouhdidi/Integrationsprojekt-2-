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

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
