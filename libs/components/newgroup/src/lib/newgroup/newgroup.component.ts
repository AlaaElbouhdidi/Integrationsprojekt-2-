import { Component} from '@angular/core';
import { GroupService } from '@services';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from '@api-interfaces';

@Component({
  selector: 'mate-team-newgroup',
  templateUrl: './newgroup.component.html',
  styleUrls: ['./newgroup.component.scss']
})
export class NewgroupComponent {
  newGroupForm: FormGroup;
  constructor( private fb: FormBuilder, private groupService: GroupService,
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

}