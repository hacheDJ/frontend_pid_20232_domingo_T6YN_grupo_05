import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppSettings } from "../app.settings";
import { FindByIdRes } from "../dtos/find.by.id.res";
import { UserListByRoleBossAndLenderRes } from "../dtos/UserListByRoleBossAndLenderRes.dto";
import { UserSigninRes } from "../dtos/UserSigninRes.dto";
import { UserToEditReq } from "../dtos/UserToEditReq.dto";
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
        return this.httpClient.patch(adminUrl, data);
    }

    findUserToEdit(data: UserToEditReq): Observable<any> {
        return this.httpClient.post(`${adminUrl}/findUserToEdit`, data);
    }

    findUserLenderToEditByGroup(data: UserToEditReq): Observable<any> {
        return this.httpClient.post(`${adminUrl}/listUserByRoleForUpdateLender`, data);
    }

    listByIdPortfolio(idPortfolio: number): Observable<UserSigninRes[]>{
        return this.httpClient.get<UserSigninRes[]>(`${adminUrl}/listBorrowerByPortfolioClient/${idPortfolio}`)
    }

    listByRoleLenderBoss(): Observable<UserListByRoleBossAndLenderRes[]>{
        return this.httpClient.get<UserListByRoleBossAndLenderRes[]>(`${adminUrl}/listByRoleLenderBoss`)
    }

    findById(id: number): Observable<FindByIdRes>{
        return this.httpClient.get<FindByIdRes>(`${adminUrl}/findById/${id}`)
    }

}