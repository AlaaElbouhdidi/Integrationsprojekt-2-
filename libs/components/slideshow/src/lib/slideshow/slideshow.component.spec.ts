import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideshowComponent } from './slideshow.component';
import { SlideshowModule } from '../slideshow.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SlideshowComponent', () => {
    let component: SlideshowComponent;
    let fixture: ComponentFixture<SlideshowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                SlideshowModule,
                BrowserAnimationsModule
            ],
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SlideshowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set 4000ms as default for slide interval delay', () => {
        expect(component.slideIntervalDelay).toEqual(4000);
    });

    it('should contain three images for the slideshow', () => {
        expect(component.slides.length).toBe(3);
    });

    it('should set the active slide index in initSlideInterval and call setSlideInterval', () => {
        const spy = jest.spyOn(component, 'setSlideInterval');
        expect(component.activeSlideIndex).toEqual(0);
        component.initSlideInterval(2);
        expect(component.activeSlideIndex).toEqual(2);
        expect(spy).toHaveBeenCalled();
    });

    it('should call set interval with the slideIntervalDelay', () => {
        jest.useFakeTimers();
        jest.spyOn(global, 'setInterval');
        component.setSlideInterval();
        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), component.slideIntervalDelay);
    });
});
