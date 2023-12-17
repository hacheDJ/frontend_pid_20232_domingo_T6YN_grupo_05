import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppSettings } from "../app.settings";
import { LoanDetailByLenderRes } from "../dtos/LoanDetailByLenderRes.dto";
import { RequestLoanRegisterReq } from "../dtos/RequestLoanRegisterReq.dto";
import { RequestLoanUpdateReq } from "../dtos/RequestLoanUpdateReq.dto";
import { ReviewFinancialPerformanceRes } from "../dtos/review.financial.performance.res";
import { RequestLoan } from "../models/requestLoan.model";


const requestLoanUrl = `${AppSettings.API_ENDPOINT}/requestLoan`;

@Injectable({
    providedIn:"root"
})

export class RequestLoanService {
    constructor(private httpClient: HttpClient){
    }

    insert(data: RequestLoanRegisterReq): Observable<any> {
        return this.httpClient.post(requestLoanUrl, data)
    }

    listByLender(idPortfolio: number): Observable<RequestLoan[]>{
        return this.httpClient.get<RequestLoan[]>(`${requestLoanUrl}/listByLender/${idPortfolio}`)
    }

    listByRegistrationDateRange(start: Date, end: Date, idPortfolio: number): Observable<RequestLoan[]>{
        return this.httpClient.get<RequestLoan[]>(`${requestLoanUrl}/listByRegistrationDateRange/${start}/${end}/${idPortfolio}`)
    }

    listByIdBorrower(id: number): Observable<RequestLoan[]>{
        return this.httpClient.get<RequestLoan[]>(`${requestLoanUrl}/listByIdBorrower/${id}`)
    }

    updateCanceledStatus(data: RequestLoanUpdateReq): Observable<any> {
        return this.httpClient.patch(`${requestLoanUrl}/updateCanceledStatus`, data)
    }

    updateApproveStatus(data: RequestLoanUpdateReq): Observable<any> {
        return this.httpClient.post(`${requestLoanUrl}/updateApproveStatus`, data)
    }

    listByRegistrationDateRangeAndState(start: Date, end: Date, state: string, idBorrower: number, idPortfolio: number): Observable<RequestLoan[]>{
        return this.httpClient.get<RequestLoan[]>(`${requestLoanUrl}/listByRegistrationDateRangeAndState/${start}/${end}/${state}/${idBorrower}/${idPortfolio}`)
    }

    listLoanByBorrower(idPortfolio: number, idBorrower: number): Observable<RequestLoan[]>{
        return this.httpClient.get<RequestLoan[]>(`${requestLoanUrl}/listLoanByBorrower/${idPortfolio}/${idBorrower}`)
    }

    listLoanDetailByLender(idLender: number): Observable<LoanDetailByLenderRes[]>{
        return this.httpClient.get<LoanDetailByLenderRes[]>(`${requestLoanUrl}/listLoanDetailByLender/${idLender}`)
    }

    reviewFinancialPerformance(idGroup: number): Observable<ReviewFinancialPerformanceRes[]>{
        return this.httpClient.get<ReviewFinancialPerformanceRes[]>(`${requestLoanUrl}/reviewFinancialPerformance/${idGroup}`)
    }

}