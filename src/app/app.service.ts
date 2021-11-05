import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable, throwError } from "rxjs";
/**
 * AppService
 */
@Injectable({
    providedIn: "root"
})
export class AppService {
    /**
     * Base backend endpoint
     */
    apiUrl: string = environment.apiUrl;

    /**
     * Constructor that initialized the HttpClient
     * @param {HttpClient} http
     */
    constructor(private http: HttpClient) {}

    /**
     * Convenience method that just calls the API at the specified path
     * @param {string} path
     * @returns {Promise<HttpEvent<string> | Observable<never>>}
     */
    async get(path: string): Promise<HttpEvent<string> | Observable<never>> {
        const url = `${this.apiUrl}/${path}`;
        const headers = this.createHeader("application/json");
        return this.http.get<string>(url, headers).toPromise().catch(this.handleError);
    }

    /**
     * Convenience method to generate required headers
     * @param {string} contentType
     * @returns {{ [key: string]: HttpHeaders | string }}
     */
    private createHeader(contentType: string): any {
        return { headers: new HttpHeaders({ "Content-Type": contentType }), responseType: "text" };
    }

    /**
     * Convenience method to handle errors
     * @param {HttpErrorResponse} err
     * @returns {Observable<never>}
     */
    private handleError(err: HttpErrorResponse): Observable<never> {
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
