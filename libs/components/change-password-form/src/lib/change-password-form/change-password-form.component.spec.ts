import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePasswordFormComponent } from './change-password-form.component';
import { ChangePasswordFormModule } from '../change-password-form.module';

describe('ChangePasswordFormComponent', () => {
    let component: ChangePasswordFormComponent;
    let fixture: ComponentFixture<ChangePasswordFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChangePasswordFormModule],
            declarations: [ChangePasswordFormComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangePasswordFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
