import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { GroupModalDialogComponent } from './group-modal-dialog.component';

describe('GroupModalDialogComponent', () => {
    let component: GroupModalDialogComponent;
    let fixture: ComponentFixture<GroupModalDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GroupModalDialogComponent],
            providers: [NgbActiveModal]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupModalDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
