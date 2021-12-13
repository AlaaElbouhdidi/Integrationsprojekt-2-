import { Component, Input, OnChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { GroupModalDialogComponent } from '../group-modal-dialog/group-modal-dialog.component';
import { Group } from '@api-interfaces';
import { Router } from '@angular/router';

@Component({
    selector: 'mate-team-groups-section-screen',
    templateUrl: './groups-section-screen.component.html',
    styleUrls: ['./groups-section-screen.component.scss']
})
export class GroupsSectionScreenComponent implements OnChanges {
    /**
     * Contains all groups
     */
    @Input()
    groups: Group[] | undefined;
    /**
     * Contains groups that are shown based on the filtering output
     */
    shownGroups: Group[] | undefined;
    /**
     * Only true iff the filter is enabled based on the member
     */
    enabledMemberFilter = true;
    /**
     * Contains the search text.
     */
    /**
     * Constructor
     * @param modalService
     * @param router
     */
    constructor(public modalService: NgbModal, private router: Router) {}

    /**
     * Does the filtering based on the given textSearch.
     * @param textSearch
     */
    doFiltering(textSearch = ''): void {
        if (this.groups === undefined) {
            return;
        }
        if (this.enabledMemberFilter) {
            this.shownGroups = this.groups.filter(
                (x) =>
                    x.member?.find((y) =>
                        y.uid?.toUpperCase().includes(textSearch.toUpperCase())
                    ) !== undefined
            );
        } else {
            /*
            const parsedMoment = moment(textSearch, 'DD.MM.YYYY');
            this.shownGroups = this.groups.filter((x) => {
                return (
                    moment(x.creationDate).format('DD.MM.YYYY') ===
                    parsedMoment.format('DD.MM.YYYY')
                );
            });
             */
        }
    }

    /**
     * Updates the shownGroups based on the filter.
     */
    ngOnChanges(): void {
        this.doFiltering();
    }

    /**
     * This is called iff the user clicks on the open button of one group.
     * Routes to the specific group view.
     * @param g
     */
    clicked(g: Group): void {
        this.router.navigate(['./group', g.id]);
    }
}
