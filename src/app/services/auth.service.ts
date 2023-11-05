import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppSettings } from "../app.settings";
import { UserSignInRequest } from "../dtos/UserSignInRequest.dto";


const authUrl = `${AppSettings.API_ENDPOINT}/auth`;

@Injectable({
    providedIn:"root"
})

export class AuthService {
    constructor(private httpClient: HttpClient){
    }

    signIn(data: UserSignInRequest): Observable<any> {
        return this.httpClient.post(authUrl, data);
    }
}