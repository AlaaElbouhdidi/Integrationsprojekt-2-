import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GroupService } from '@services';

/**
 * Group component
 */
@Component({
    selector: 'mate-team-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {
    /**
     * Subject for unsubscribing from observables
     * @private
     */
    private destroy$ = new Subject();
    /**
     * Group id
     */
    groupId: string | null = null;
    /**
     * Active Route
     */
    activeRoute = '';

    /**
     * Constructor of group
     * @param route {ActivatedRoute}
     * @param router {Router}
     * @param groupService {GroupService}
     */
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private groupService: GroupService
    ) {
        this.activeRoute = this.router.url;
    }

    /**
     * Get route parameters and set active Route on init
     */
    ngOnInit(): void {
        this.route.paramMap
            .pipe(takeUntil(this.destroy$))
            .subscribe((param) => {
                this.groupId = param.get('id');
                this.groupService.currentGroupId =
                    param.get('id') === null ? '' : (param.get('id') as string);
            });
        this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.activeRoute = this.router.url;
            }
        });
    }

    /**
     * Navigate to a given child route
     *
     * @param routeParam The parameter to navigate to
     */
    navigateTo(routeParam: 'events' | 'statistics' | 'members'): void {
        this.router.navigate([routeParam], { relativeTo: this.route });
    }

    /**
     * Unsubscribe from observables
     */
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
