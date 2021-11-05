import { Component, OnInit } from "@angular/core";
import { AppService } from "./app.service";

/**
 * App component
 */
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    /**
     * Project title definition
     */
    title = "Mate Team";
    constructor(private appService: AppService) {}

    async ngOnInit() {
        let response = await this.appService.get();
        console.log(response);
    }
}
