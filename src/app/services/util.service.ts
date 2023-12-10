import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { DocumentType } from '../models/documentType.model';
import { Group } from '../models/group.model';
import { LoanCategory } from '../models/loanCategory.model';
import { User } from '../models/user.model';

const ENDPOINT_BASE = AppSettings.API_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http:HttpClient) { }

  listDocuments(): Observable<DocumentType[]>{
    return this.http.get<DocumentType[]>(`${ENDPOINT_BASE}/document`);
  }

  listUserByRoleLenderBossAndLender(): Observable<User[]>{
    return this.http.get<User[]>(`${ENDPOINT_BASE}/admin/listUserByRole`);
  }

  listGroups(): Observable<Group[]>{
    return this.http.get<Group[]>(`${ENDPOINT_BASE}/group`);
  }

  listLoanCategories(): Observable<LoanCategory[]>{
    return this.http.get<LoanCategory[]>(`${ENDPOINT_BASE}/loanCategory`);
  }

}


