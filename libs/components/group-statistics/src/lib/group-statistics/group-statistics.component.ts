import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'mate-team-group-statistics',
  templateUrl: './group-statistics.component.html',
  styleUrls: ['./group-statistics.component.scss']
})
export class GroupStatisticsComponent implements OnInit{

    ngOnInit(): void {
        console.log('GroupStatisticsComponent loaded')
    }
}
