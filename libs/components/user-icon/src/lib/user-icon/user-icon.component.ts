import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IconService } from '@services';

@Component({
  selector: 'mate-team-user-icon',
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.scss']
})
export class UserIconComponent implements OnInit, OnChanges {
    @Input() userIconString = '';
    icon: IconProp = 'user';
    iconColor = '#0c2d48';
    iconBackground = '#ffffff';

    constructor(
        private iconService: IconService
    ) { }

    setIconValues(): void {
        const [icon, iconColor, iconBackground] = this.iconService.decodeIconString(this.userIconString);
        this.iconColor = iconColor;
        this.iconBackground = iconBackground;
        this.icon = icon as IconProp;
    }

    ngOnChanges(): void {
        if (this.userIconString.length === 0) {
            return;
        }
        this.setIconValues();
    }

    ngOnInit(): void {
        if (this.userIconString.length === 0) {
            return;
        }
        this.setIconValues();
    }
}
