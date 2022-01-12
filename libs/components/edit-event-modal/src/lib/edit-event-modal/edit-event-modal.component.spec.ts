import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventModalComponent } from './edit-event-modal.component';
import { EditEventModalModule } from '../edit-event-modal.module';

describe('EditEventModalComponent', () => {
    let component: EditEventModalComponent;
    let fixture: ComponentFixture<EditEventModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditEventModalModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditEventModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
