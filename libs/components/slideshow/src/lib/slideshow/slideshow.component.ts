import { Component, OnDestroy } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'mate-team-slideshow',
    templateUrl: './slideshow.component.html',
    styleUrls: ['./slideshow.component.scss'],
    animations: [
        trigger('slideTextAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('200ms', style({ opacity: 1 }))
            ])
        ]),
        trigger('slideAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(-2rem)' }),
                animate(
                    '200ms',
                    style({ opacity: 1, transform: 'translateY(0)' })
                )
            ])
        ])
    ]
})
export class SlideshowComponent implements OnDestroy {
    /**
     * Interval of the slideshow
     */
    slideInterval: ReturnType<typeof setInterval>;
    /**
     * Index of the currently active slide
     */
    activeSlideIndex = 0;
    /**
     * Delay of the slideshow
     */
    slideIntervalDelay = 4000;
    /**
     * Array containing the slides
     */
    slides = [
        {
            src: 'assets/svgs/online_calender.svg',
            alt: 'Woman standing next to a calender',
            text: 'Manage events and create polls to easier decide dates'
        },
        {
            src: '/assets/svgs/connection_teams.svg',
            alt: 'Different icons with users',
            text: 'Build up your team and connect with your mates'
        },
        {
            src: '/assets/svgs/winners.svg',
            alt: 'Two people celebrating next to a trophy',
            text: 'Track your results and see who leads the leaderboard'
        }
    ];

    /**
     * Constructor which initializes the slide interval
     */
    constructor() {
        this.slideInterval = this.setSlideInterval();
    }

    /**
     * Sets the slide interval and the starting point of the slideshow
     *
     * @param startIndex {number} Index of the slide to start the slideshow from
     */
    initSlideInterval(startIndex: number): void {
        this.activeSlideIndex = startIndex;
        this.slideInterval = this.setSlideInterval();
    }

    /**
     * @returns {NodeJS.Timeout} Interval of the slideshow
     */
    setSlideInterval(): ReturnType<typeof setInterval> {
        return setInterval(() => {
            this.activeSlideIndex === this.slides.length - 1
                ? (this.activeSlideIndex = 0)
                : (this.activeSlideIndex += 1);
            this.setSelectedSlide(this.activeSlideIndex);
        }, this.slideIntervalDelay);
    }

    /**
     * Sets the active slide
     *
     * @param index {number} Index of the slide to set as active
     */
    setSelectedSlide(index: number): void {
        clearInterval(this.slideInterval);
        this.initSlideInterval(index);
    }

    /**
     * Clears the interval
     */
    ngOnDestroy(): void {
        clearInterval(this.slideInterval);
    }
}
