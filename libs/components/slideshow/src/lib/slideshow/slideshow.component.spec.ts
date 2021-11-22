import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideshowComponent } from './slideshow.component';
import { SlideshowModule } from '../slideshow.module';

describe('SlideshowComponent', () => {
    let component: SlideshowComponent;
    let fixture: ComponentFixture<SlideshowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SlideshowModule],
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SlideshowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
