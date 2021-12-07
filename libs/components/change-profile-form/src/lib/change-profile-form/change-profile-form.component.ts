import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { IconService } from '@services';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ChangeProfileData } from '@api-interfaces';

@Component({
    selector: 'mate-team-change-profile-form',
    templateUrl: './change-profile-form.component.html',
    styleUrls: ['./change-profile-form.component.scss'],
})
export class ChangeProfileFormComponent implements OnInit {
    @Output() changeProfileEvent = new EventEmitter();
    @Input() userIconString: string | null = '';
    @Input() userDisplayName: string | null = '';
    @Input() loading = false;
    changeProfileForm: FormGroup;
    previewIcon = '';
    selectedIcon = 'user';
    selectedIconIndex = 0;
    icons: IconProp[] = [];

    constructor(private fb: FormBuilder, private iconService: IconService) {
        this.changeProfileForm = this.fb.group({
            iconColor: new FormControl(''),
            iconBackground: new FormControl(''),
            displayName: new FormControl('', [
                Validators.maxLength(15),
                Validators.required,
            ]),
        });
        this.icons = this.iconService.getIcons();
    }

    get iconColor(): AbstractControl {
        return this.changeProfileForm.controls.iconColor;
    }

    get iconBackground(): AbstractControl {
        return this.changeProfileForm.controls.iconBackground;
    }

    get displayName(): AbstractControl {
        return this.changeProfileForm.controls.displayName;
    }

    updatePreviewIcon(): void {
        this.previewIcon = this.iconService.encodeIconString(
            String(this.selectedIcon),
            this.iconColor.value,
            this.iconBackground.value
        );
    }

    nextIcon(): void {
        if (this.selectedIconIndex === this.icons.length - 1) {
            this.selectedIconIndex = 0;
        } else {
            this.selectedIconIndex++;
        }
        this.selectedIcon = String(this.icons[this.selectedIconIndex]);
        this.updatePreviewIcon();
    }

    previousIcon(): void {
        if (this.selectedIconIndex === 0) {
            this.selectedIconIndex = this.icons.length - 1;
        } else {
            this.selectedIconIndex--;
        }
        this.selectedIcon = String(this.icons[this.selectedIconIndex]);
        this.updatePreviewIcon();
    }

    changeProfile(): void {
        const data: ChangeProfileData = {
            displayName: this.displayName.value,
            photoURL: this.iconService.encodeIconString(
                this.selectedIcon,
                this.iconColor.value,
                this.iconBackground.value
            ),
        };
        this.changeProfileEvent.emit(data);
    }

    ngOnInit(): void {
        if (this.userIconString?.length === 0) {
            this.previewIcon = this.iconService.encodeIconString(
                'user',
                '#0c2d48',
                '#ffffff'
            );
            this.changeProfileForm.reset({
                displayName: this.userDisplayName,
                iconColor: '#0c2d48',
                iconBackground: '#ffffff',
            });
        } else {
            if (this.userIconString) {
                const [icon, iconColor, iconBackground] =
                    this.iconService.decodeIconString(this.userIconString);
                this.changeProfileForm.reset({
                    displayName: this.userDisplayName,
                    iconColor: iconColor,
                    iconBackground: iconBackground,
                });
                this.selectedIcon = icon;
                this.updatePreviewIcon();
            }
        }
    }
}
