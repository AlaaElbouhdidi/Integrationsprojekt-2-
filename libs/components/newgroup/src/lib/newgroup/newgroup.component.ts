import { Component, OnInit} from '@angular/core';
import { ActivityService, GroupService } from '@services';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Activity, Group } from '@api-interfaces';

@Component({
  selector: 'mate-team-newgroup',
  templateUrl: './newgroup.component.html',
  styleUrls: ['./newgroup.component.scss']
})
export class NewgroupComponent implements OnInit {
  newGroupForm: FormGroup;
  activities: Activity[] = [];
  constructor( private fb: FormBuilder, private groupService: GroupService, private activitySevice: ActivityService,
    private router: Router) {
      this.newGroupForm = this.fb.group({
        email: new FormControl('', [ Validators.required]),
        password: new FormControl('', [
            Validators.required,
        ]),
    });
     }

     addNewGroupEntity(groupEntity: Group){
      this.groupService.addNewGroup(groupEntity);
     }
     ngOnInit(): void {
      this.activitySevice.getAllActivities().subscribe(items => {
        this.activities = items;
        console.log(this.activities);
            }
       )
   }

}