import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingpageComponent } from './landingpage.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'mate-team-slideshow',
    template: '<p>Mock Slideshow Component</p>',
})
class MockSlideshowComponent {}

describe('LandingpageComponent', () => {
    let component: LandingpageComponent;
    let fixture: ComponentFixture<LandingpageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LandingpageComponent, MockSlideshowComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LandingpageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render slideshow', () => {
        expect(
            fixture.debugElement.query(By.css('mate-team-slideshow'))
        ).not.toBeNull();
    });
});
