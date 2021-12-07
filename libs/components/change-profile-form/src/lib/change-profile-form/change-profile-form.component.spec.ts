import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeProfileFormComponent } from './change-profile-form.component';
import { ChangeProfileFormModule } from '../change-profile-form.module';

describe('ChangeProfileFormComponent', () => {
    let component: ChangeProfileFormComponent;
    let fixture: ComponentFixture<ChangeProfileFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ ChangeProfileFormModule ],
            declarations: [ChangeProfileFormComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangeProfileFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
