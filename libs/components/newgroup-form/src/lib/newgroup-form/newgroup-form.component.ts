import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Activity, Group } from '@api-interfaces';
import { ActivityService } from '@services';
@Component({
  selector: 'mate-team-newgroup-form',
  templateUrl: './newgroup-form.component.html',
  styleUrls: ['./newgroup-form.component.sass']
})
export class NewgroupFormComponent implements OnInit {
  @Output() addGroup: EventEmitter<Group> = new EventEmitter();
  newGroupForm: FormGroup;
  activities: Activity[] = [];
  constructor( private fb: FormBuilder, private router: Router, private activitySevice: ActivityService) {
      this.newGroupForm = this.fb.group({
        name: new FormControl('', [ Validators.required ]),
        activity: new FormControl('', [ Validators.required ])
      });
  }
  get name(): AbstractControl {
      return this.newGroupForm.controls.name;
  }

  get activity(): AbstractControl {
      return this.newGroupForm.controls.activity;
  }
  get description(): AbstractControl {
    return this.newGroupForm.controls.description;
}

  newGroup(){
    const newGroupEntry: Group = {
      name: this.name.value,
      activity: this.activity.value,
      description: this.description.value
    }
    this.addGroup.emit(newGroupEntry);

  }
  ngOnInit(): void {
    this.activitySevice.getAllActivities().subscribe(items => {
      this.activities = items;
      console.log(this.activities);
          }
     )
 }

}
