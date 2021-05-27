import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private url = `${environment.api}/v1/incomes`;

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
   * @param income Income to be inserted or deleted
   */
  save(income: any): Observable<any> {
    if (income._id) {
      return this.http.put<any>(`${this.url}/${income._id}`, income);
    }
    return this.http.post<any>(`${this.url}`, income);
  }

  /**
   * @param id Income Id to be deleted
   */
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
