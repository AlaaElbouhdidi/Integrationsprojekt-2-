import { Injectable } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

/**
 * Icon service
 */
@Injectable({
    providedIn: 'root'
})
export class IconService {
    /**
     * All user icons
     */
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

    /**
     * Get all user icons
     *
     * @returns {IconProp[]} All icons
     */
    getIcons(): IconProp[] {
        return this.icons;
    }

    /**
     * Decode icon code string
     *
     * @param iconCode {string} The string to decode
     * @returns {string[]} Array containing icon, color and background values
     */
    decodeIconString(iconCode: string): string[] {
        return iconCode.split('/');
    }

    /**
     * Encode icon string for storage
     *
     * @param icon {string} The icon
     * @param iconColor {string} The color of the icon
     * @param iconBackground {string} The background of the icon
     * @returns {string} The encoded icon string
     */
    encodeIconString(
        icon: string,
        iconColor: string,
        iconBackground: string
    ): string {
        return `${icon}/${iconColor}/${iconBackground}`;
    }
}
