import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventFormComponent } from './edit-event-form.component';
import { EditEventFormModule } from '../edit-event-form.module';

describe('EditEventFormComponent', () => {
    let component: EditEventFormComponent;
    let fixture: ComponentFixture<EditEventFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditEventFormModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditEventFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
