import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppSettings } from "../app.settings";
import { PayReq } from "../dtos/PayReq.dto";
import { RequestLoanRegisterReq } from "../dtos/RequestLoanRegisterReq.dto";
import { RequestLoanUpdateReq } from "../dtos/RequestLoanUpdateReq.dto";
import { Pay } from "../models/pay.model";
import { RequestLoan } from "../models/requestLoan.model";


const payUrl = `${AppSettings.API_ENDPOINT}/pay`;

@Injectable({
    providedIn:"root"
})

export class PayService {
    constructor(private httpClient: HttpClient){
    }


    listByIdLoan(idLoan: number): Observable<Pay[]>{
        return this.httpClient.get<Pay[]>(`${payUrl}/${idLoan}`)
    }

    listByStateAndIdLoan(state: string, idLoan: number): Observable<Pay[]>{
        return this.httpClient.get<Pay[]>(`${payUrl}/listByStateAndIdLoan/${state}/${idLoan}`)
    }

    updateState(payReq: PayReq): Observable<any>{
        return this.httpClient.patch<any>(`${payUrl}/updateState`, payReq)
    }
}