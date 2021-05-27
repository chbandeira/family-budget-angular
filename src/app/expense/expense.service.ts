import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private url = `${environment.api}/v1/expenses`;

  constructor(private http: HttpClient) { }

  /**
   * @param month January starts at 0
   */
  fetch(year: number, month?: number): Observable<any> {
    if (month === undefined || month < 0) {
      return this.http.get<any>(`${this.url}?year=${year}`);
    }
    return this.http.get<any>(`${this.url}?year=${year}&month=${(month + 1)}`);
  }

  /**
   * @param month January starts at 0
   */
  fetchSum(year: number, month?: number): Observable<any> {
    if (month === undefined || month < 0) {
      return this.http.get<any>(`${this.url}/sum?year=${year}`);
    }
    return this.http.get<any>(`${this.url}/sum?year=${year}&month=${(month + 1)}`);
  }

  /**
   * @param expense Expense to be inserted or updated
   */
  save(expense: any): Observable<any> {
    if (expense._id) {
      return this.http.put<any>(`${this.url}/${expense._id}`, expense);
    }
    return this.http.post<any>(`${this.url}`, expense);
  }

  /**
   * @param id Expense Id to be deleted
   */
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
