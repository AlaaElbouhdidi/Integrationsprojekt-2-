import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IconService } from '@services';

/**
 * User icon component
 */
@Component({
    selector: 'mate-team-user-icon',
    templateUrl: './user-icon.component.html',
    styleUrls: ['./user-icon.component.scss']
})
export class UserIconComponent implements OnInit, OnChanges {
    /**
     * Encoded user icon string
     */
    @Input() userIconString = '';
    /**
     * User icon
     */
    icon: IconProp = 'user';
    /**
     * Icon color
     */
    iconColor = '#0c2d48';
    /**
     * Icon background color
     */
    iconBackground = '#ffffff';
    /**
     * Determines if user icon is scaled
     */
    @Input() scaled = false;

    /**
     * Constructor of icon service
     * @param iconService {IconService}
     */
    constructor(private iconService: IconService) {}

    /**
     * Decode user icon string and set corresponding values in component
     */
    setIconValues(): void {
        const [icon, iconColor, iconBackground] =
            this.iconService.decodeIconString(this.userIconString);
        this.iconColor = iconColor;
        this.iconBackground = iconBackground;
        this.icon = icon as IconProp;
    }

    /**
     * Set icon values on change
     */
    ngOnChanges(): void {
        if (this.userIconString.length === 0) {
            return;
        }
        if (this.userIconString.startsWith('https')) {
            this.iconColor = '#0c2d48';
            this.icon = 'user';
            this.iconBackground = '#ffffff';
            return;
        }
        this.setIconValues();
    }

    /**
     * Set icon values on init
     */
    ngOnInit(): void {
        if (this.userIconString.length === 0) {
            return;
        }
        if (this.userIconString.startsWith('https')) {
            this.iconColor = '#0c2d48';
            this.icon = 'user';
            this.iconBackground = '#ffffff';
            return;
        }
        this.setIconValues();
    }
}
