import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cost } from './cost.model';
import { api } from 'src/api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CostService {
  url = api.url + 'costs';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(cost: Cost): Observable<Cost> {
    return this.http.post<Cost>(this.url, cost);
  }

  update(cost: Cost): Observable<Cost> {
    return this.http.put<Cost>(`${this.url}/${cost.id}`, cost);
  }

  getById(id: string): Observable<Cost> {
    return this.http.get<Cost>(`${this.url}/${id}`);
  }

  getAllCosts(): Observable<Cost[]> {
    return this.http.get<Cost[]>(this.url);
  }

  delete(id: string): Observable<Cost> {
    return this.http.delete<Cost>(`${this.url}/${id}`);
  }
}
