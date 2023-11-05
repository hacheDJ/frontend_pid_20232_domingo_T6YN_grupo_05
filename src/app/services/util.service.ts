import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { DocumentType } from '../models/documentType.model';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/document';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http:HttpClient) { }

  listDocuments():Observable<DocumentType[]>{
    return this.http.get<DocumentType[]>(baseUrlUtil);
  }
}


