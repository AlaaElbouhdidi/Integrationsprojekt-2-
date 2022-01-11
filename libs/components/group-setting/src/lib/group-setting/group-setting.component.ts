import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from '@api-interfaces';
import { GroupService } from '@services';

@Component({
    selector: 'mate-team-group-setting',
    templateUrl: './group-setting.component.html',
    styleUrls: ['./group-setting.component.scss']
})
export class GroupSettingComponent implements OnInit {
    /**
     * Team form group
     */
    editGroupForm: FormGroup;
    /**
     * the state of the input
     */
    isInvalid = false;
    /**
     * the error message when the state is wrong
     */
    errorMessage = '';
    /**
     * the to be edited group
     */
    @Input() group = {} as Group;

    @Output() manageGroup = new EventEmitter<any>();
    @Output() deleteGroupEvent = new EventEmitter<boolean>();
    /**
     * Constructor of group
     * @param router {Router}
     * @param groupService {GroupService}
     * @param modalService {NgbModal}
     * @param fb {FormBuilder}
     */
    constructor(
        private router: Router,
        private groupService: GroupService,
        private fb: FormBuilder
    ) {
        this.editGroupForm = this.fb.group({
            name: new FormControl(null, [
                Validators.required,
                Validators.maxLength(15)
            ]),
            description: new FormControl(null, Validators.maxLength(200))
        });
    }
    /**
     * @returns {AbstractControl} The name input control of the form
     */
    get name(): AbstractControl {
        return this.editGroupForm.controls.name;
    }
    /**
     * @returns {AbstractControl} The desription input control of the form
     */
    get description(): AbstractControl {
        return this.editGroupForm.controls.description;
    }

    /**
     * tthe to be edited group
     */
    applyChanges() {
      const data = {
        name: this.name.value,
        description: this.description.value
      }
        this.manageGroup.emit(data);
    }
    /**
     * tthe to be edited group
     */
    discard() {
        this.manageGroup.emit(false);
    }
    /**
     * the to be edited group
     */
    deleteGroup() {
        this.deleteGroupEvent.emit(true);
    }

    ngOnInit(): void {
        this.editGroupForm.patchValue({
            name: this.group.name,
            description: this.group.description
        });
    }
}
