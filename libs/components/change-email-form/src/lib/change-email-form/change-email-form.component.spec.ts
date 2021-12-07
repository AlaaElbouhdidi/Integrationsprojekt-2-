import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailFormComponent } from './change-email-form.component';
import { ChangeEmailFormModule } from '../change-email-form.module';

describe('ChangeEmailFormComponent', () => {
    let component: ChangeEmailFormComponent;
    let fixture: ComponentFixture<ChangeEmailFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ ChangeEmailFormModule ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangeEmailFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
