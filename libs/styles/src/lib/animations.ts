import { animate, style, transition, trigger } from '@angular/animations';

export const slideAnimation = trigger('slideAnimation', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateY(2rem)' }),
        animate('200ms', style({ opacity: 1, transform: 'translateY(0)' }))
    ])
]);

export const itemAnimation = trigger('itemAnimation', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 }))
    ])
]);
