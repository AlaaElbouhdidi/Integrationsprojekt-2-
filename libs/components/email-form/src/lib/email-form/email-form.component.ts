import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService, AuthService } from '@services';
import { Router } from '@angular/router';

@Component({
  selector: 'mate-team-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent {
    emailForm: FormGroup;
    loading = false;
    @Output() cancelResetEvent = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router
    ) {
        this.emailForm = this.fb.group({
            email: new FormControl('', [
                Validators.email,
                Validators.required
            ])
        });
    }

    get email(): AbstractControl {
        return this.emailForm.controls.email;
    }

    cancelReset(): void {
        this.cancelResetEvent.emit();
    }

    async resetPassword(): Promise<void> {
        try {
            this.loading = true;
            await this.authService.resetPassword(this.email.value);
            this.alertService.addAlert({
                type: 'success',
                message: 'Email for password reset has been sent',
            });
            this.loading = false;
            this.emailForm.reset();
            await this.router.navigate(['/']);
        } catch (e) {
            this.loading = false;
            this.emailForm.reset();
            this.alertService.addAlert({
                type: 'error',
                message: e.message,
            });
        }
    }
}
