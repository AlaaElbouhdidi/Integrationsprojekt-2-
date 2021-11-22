import { Component, Input, OnChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupModel } from '@services';
import { GroupModalDialogComponent } from '../group-modal-dialog/group-modal-dialog.component';
import * as moment from 'moment';
import { Group } from '@api-interfaces';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'mate-team-groups-section-screen',
    templateUrl: './groups-section-screen.component.html',
    styleUrls: ['./groups-section-screen.component.scss'],
})
export class GroupsSectionScreenComponent implements OnChanges {
    @Input()
    groups: Group[] | undefined;
    shownGroups: Group[] | undefined;
    enabledMemberFilter = true;
    textSearch = '';

    constructor(public modalService: NgbModal) {}

    doFiltering(): void {
        if (this.groups === undefined) {
            return;
        }
        if (this.enabledMemberFilter) {
            this.shownGroups = this.groups.filter(
                (x) =>
                    x.members.find((y) =>
                        y.toUpperCase().includes(this.textSearch.toUpperCase())
                    ) !== undefined
            );
        } else {
            const parsedMoment = moment(this.textSearch, 'DD.MM.YYYY');
            this.shownGroups = this.groups.filter((x) => {
                return (
                    moment(x.creationDate).format('DD.MM.YYYY') ===
                    parsedMoment.format('DD.MM.YYYY')
                );
            });
        }
    }

    ngOnChanges(): void {
        this.doFiltering();
    }

    clicked(g: Group): void {
        const ref = this.modalService.open(GroupModalDialogComponent);
        ref.componentInstance.group = g;
    }
}
