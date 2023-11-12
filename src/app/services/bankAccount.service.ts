import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppSettings } from "../app.settings";
import { RequestLoanRegisterReq } from "../dtos/RequestLoanRegisterReq.dto";
import { BankAccount } from "../models/bankAccount.model";
import { RequestLoan } from "../models/requestLoan.model";


const baseUrl = `${AppSettings.API_ENDPOINT}/admin`

@Injectable({
    providedIn:"root"
})

export class BankAccountService {
    constructor(private httpClient: HttpClient){
    }

    insert(data: BankAccount): Observable<any> {
        return this.httpClient.post(`${baseUrl}/registerBankAccountByBorrower`, data)
    }

    listAll(): Observable<BankAccount[]> {
        return this.httpClient.get<BankAccount[]>(`${baseUrl}/listAllBankAccount`)
    }

    findById(id: number): Observable<BankAccount> {
        return this.httpClient.get<BankAccount>(`${baseUrl}/findBankAccountById/${id}`)
    }


}