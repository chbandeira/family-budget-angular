import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImportCsvService {

  private url = `${environment.api}/v1/import`;

  constructor(private http: HttpClient) { }

  /**
   * Upload a CSV file and get parsed transactions back
   */
  uploadCsv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.url}/csv`, formData);
  }

  /**
   * Save finalized transactions to the database
   */
  saveTransactions(transactions: any[]): Observable<any> {
    return this.http.post<any>(`${this.url}/save`, { transactions });
  }
}
