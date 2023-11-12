import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppSettings } from "../app.settings";
import { RequestLoanRegisterReq } from "../dtos/RequestLoanRegisterReq.dto";
import { RequestLoan } from "../models/requestLoan.model";


const requestLoanUrl = `${AppSettings.API_ENDPOINT}/admin/registerRequestLoanByBorrower`;

@Injectable({
    providedIn:"root"
})

export class RequestLoanService {
    constructor(private httpClient: HttpClient){
    }

    insert(data: RequestLoanRegisterReq): Observable<any> {
        return this.httpClient.post(requestLoanUrl, data)
    }


}