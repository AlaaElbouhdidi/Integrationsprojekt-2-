import { Component, OnInit } from '@angular/core';
import { ActivityService} from '@services';

@Component({
    selector: 'mate-team-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    constructor(
        private activitySevice: ActivityService){
            
        }
    ngOnInit(): void {
       this.activitySevice.getAllActivities().subscribe(items => {
           console.log(items);
       }
        )
    }
}
