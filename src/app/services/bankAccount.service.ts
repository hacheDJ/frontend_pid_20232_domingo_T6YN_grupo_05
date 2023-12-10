import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppSettings } from "../app.settings";
import { BankAccount } from "../models/bankAccount.model";


const baseUrl = `${AppSettings.API_ENDPOINT}/bankAccount`

@Injectable({
    providedIn:"root"
})

export class BankAccountService {
    constructor(private httpClient: HttpClient){
    }

    insert(data: BankAccount): Observable<any> {
        return this.httpClient.post(baseUrl, data)
    }

    listAll(): Observable<BankAccount[]> {
        return this.httpClient.get<BankAccount[]>(baseUrl)
    }

    findById(id: number): Observable<BankAccount> {
        return this.httpClient.get<BankAccount>(`${baseUrl}/${id}`)
    }


}