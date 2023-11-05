import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppSettings } from "../app.settings";
import { UserSignInRequest } from "../dtos/UserSignInRequest.dto";
import { User } from "../models/user.model";

const adminUrl = `${AppSettings.API_ENDPOINT}/admin`;

@Injectable({
    providedIn:"root"
})

export class UserService {
    constructor(private httpClient: HttpClient){
    }

    register(data: User): Observable<any> {
        return this.httpClient.post(adminUrl, data);
    }

    update(data: User): Observable<any> {
        return this.httpClient.put(adminUrl, data);
    }

}