import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'integrationsprojekt2-newgroup',
  templateUrl: './newgroup.component.html',
  styleUrls: ['./newgroup.component.scss']
})
export class NewgroupComponent {
  newGroupForm: FormGroup;
  constructor( private fb: FormBuilder,
    private router: Router) {
      this.newGroupForm = this.fb.group({
        email: new FormControl('', [ Validators.required]),
        password: new FormControl('', [
            Validators.required,
        ]),
    });
     }

  newGroup(){
    console.log("create group")
  }

}