import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GroupService } from '@services';

@Component({
    selector: 'mate-team-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject();
    groupId: string | null = null;
    activeRoute = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private groupService: GroupService
    ) {
        this.activeRoute = this.router.url;
    }

    ngOnInit(): void {
        this.route.paramMap
            .pipe(takeUntil(this.destroy$))
            .subscribe((param) => {
                this.groupId = param.get('id');
                this.groupService.currentGroupId = param.get('id') === null ? '' : param.get('id') as string;
            });
        this.router.events
            .pipe(takeUntil(this.destroy$))
            .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    this.activeRoute = this.router.url;
                }
            });
    }

    navigateTo(routeParam: 'events' | 'statistics' | 'chat' | 'members'): void {
        this.router.navigate([routeParam], { relativeTo: this.route });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
