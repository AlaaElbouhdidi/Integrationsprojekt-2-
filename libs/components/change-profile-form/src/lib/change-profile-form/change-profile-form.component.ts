import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { IconService } from '@services';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ChangeProfileData } from '@api-interfaces';

/**
 * Change profile form component
 */
@Component({
    selector: 'mate-team-change-profile-form',
    templateUrl: './change-profile-form.component.html',
    styleUrls: ['./change-profile-form.component.scss']
})
export class ChangeProfileFormComponent implements OnInit {
    /**
     * Change profile event
     */
    @Output() changeProfileEvent = new EventEmitter();
    /**
     * Encoded user icon string
     */
    @Input() userIconString = '';
    /**
     * User display name
     */
    @Input() userDisplayName = '';
    /**
     * Loading state
     */
    @Input() loading = false;
    /**
     * Change profile form group
     */
    changeProfileForm: FormGroup;
    /**
     * Encoded preview icon string
     */
    previewIcon = '';
    /**
     * Selected icon
     */
    selectedIcon = 'user';
    /**
     * Index of selected icon
     */
    selectedIconIndex = 0;
    /**
     * Icons
     */
    icons: IconProp[] = [];

    /**
     * Constructor which initializes change profile reactive form and gets all icons
     * @param fb {FormBuilder}
     * @param iconService {IconService}
     */
    constructor(private fb: FormBuilder, private iconService: IconService) {
        this.changeProfileForm = this.fb.group({
            iconColor: new FormControl(''),
            iconBackground: new FormControl(''),
            displayName: new FormControl('', [
                Validators.maxLength(15),
                Validators.required
            ])
        });
        this.icons = this.iconService.getIcons();
    }

    /**
     * @returns {AbstractControl} The icon color input control of the form
     */
    get iconColor(): AbstractControl {
        return this.changeProfileForm.controls.iconColor;
    }

    /**
     * @returns {AbstractControl} The icon background input control of the form
     */
    get iconBackground(): AbstractControl {
        return this.changeProfileForm.controls.iconBackground;
    }

    /**
     * @returns {AbstractControl} The display name input control of the form
     */
    get displayName(): AbstractControl {
        return this.changeProfileForm.controls.displayName;
    }

    /**
     * Update the preview icon
     */
    updatePreviewIcon(): void {
        this.previewIcon = this.iconService.encodeIconString(
            String(this.selectedIcon),
            this.iconColor.value,
            this.iconBackground.value
        );
    }

    /**
     * Show next icon and update preview icon
     */
    nextIcon(): void {
        if (this.selectedIconIndex === this.icons.length - 1) {
            this.selectedIconIndex = 0;
        } else {
            this.selectedIconIndex++;
        }
        this.selectedIcon = String(this.icons[this.selectedIconIndex]);
        this.updatePreviewIcon();
    }

    /**
     * Show previous icon and update preview icon
     */
    previousIcon(): void {
        if (this.selectedIconIndex === 0) {
            this.selectedIconIndex = this.icons.length - 1;
        } else {
            this.selectedIconIndex--;
        }
        this.selectedIcon = String(this.icons[this.selectedIconIndex]);
        this.updatePreviewIcon();
    }

    /**
     * Emit event to parent component with change profile data
     */
    changeProfile(): void {
        const data: ChangeProfileData = {
            displayName: this.displayName.value,
            photoURL: this.iconService.encodeIconString(
                this.selectedIcon,
                this.iconColor.value,
                this.iconBackground.value
            )
        };
        this.changeProfileEvent.emit(data);
    }

    /**
     * Check user icon string and set corresponding values
     */
    ngOnInit(): void {
        if (this.userIconString.length === 0) {
            this.previewIcon = this.iconService.encodeIconString(
                'user',
                '#0c2d48',
                '#ffffff'
            );
            this.changeProfileForm.reset({
                displayName: this.userDisplayName,
                iconColor: '#0c2d48',
                iconBackground: '#ffffff'
            });
        } else {
            if (this.userIconString.startsWith('https')) {
                const iconColor = '#0c2d48';
                const icon = 'user';
                const iconBackground = '#ffffff';
                this.changeProfileForm.reset({
                    displayName: this.userDisplayName,
                    iconColor: iconColor,
                    iconBackground: iconBackground
                });
                this.selectedIcon = icon;
                this.updatePreviewIcon();
                return;
            }
            const [icon, iconColor, iconBackground] =
                this.iconService.decodeIconString(this.userIconString);
            this.changeProfileForm.reset({
                displayName: this.userDisplayName,
                iconColor: iconColor,
                iconBackground: iconBackground
            });
            this.selectedIcon = icon;
            this.updatePreviewIcon();
        }
    }
}
