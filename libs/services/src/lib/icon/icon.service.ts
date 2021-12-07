import { Injectable } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Injectable({
    providedIn: 'root'
})
export class IconService {
    icons: IconProp[] = [
        'user',
        'dragon',
        'spider',
        'frog',
        'fish',
        'chess-king',
        'cat',
        'dog',
        'otter',
        'hippo'
    ];

    getIcons(): IconProp[] {
        return this.icons;
    }

    decodeIconString(iconCode: string): string[] {
        return iconCode.split('/');
    }

    encodeIconString(
        icon: string,
        iconColor: string,
        iconBackground: string
    ): string {
        return `${icon}/${iconColor}/${iconBackground}`;
    }
}
