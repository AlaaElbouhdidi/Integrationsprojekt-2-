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

    /**
     * Constructor that initialized the HttpClient
     * @param {AppService} appService
     */
    constructor(private appService: AppService) {}

    /**
     * Calls the Root backend url on app initialization
     */
    async ngOnInit() {
        let response = await this.appService.get("");
        console.log(response);
    }
}
