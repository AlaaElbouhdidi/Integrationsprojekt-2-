import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IconService } from '@services';

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
        this.setIconValues();
    }

    /**
     * Set icon values on init
     */
    ngOnInit(): void {
        if (this.userIconString.length === 0) {
            return;
        }
        this.setIconValues();
    }
}
