import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { throwError } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AppService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) {}

    async get() {
        const headers = this.createHeader("application/json");
        return await this.http.get<string>(this.apiUrl, headers).toPromise().catch(this.handleError);
    }

    private createHeader(contentType: string): any {
        return { headers: new HttpHeaders({ "Content-Type": contentType }), responseType: "text" };
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = "";
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
