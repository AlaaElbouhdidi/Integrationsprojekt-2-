import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprintComponent } from './imprint.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ImprintComponent', () => {
    let component: ImprintComponent;
    let fixture: ComponentFixture<ImprintComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImprintComponent],
            imports: [BrowserAnimationsModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ImprintComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
