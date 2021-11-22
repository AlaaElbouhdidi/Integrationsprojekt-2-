import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {GroupModel} from "../shared/models/GroupModel";

@Component({
  selector: 'mate-team-integrationsprojekt2-group-modal-dialog',
  templateUrl: './group-modal-dialog.component.html',
  styleUrls: ['./group-modal-dialog.component.scss']
})
export class GroupModalDialogComponent implements OnInit {
    @Input() group: GroupModel | undefined = undefined;


  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
}
