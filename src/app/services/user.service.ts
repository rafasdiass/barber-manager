import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = api.url + 'users';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  load(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getByIdCompany(idCompanys: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}?idCompanys_like=${idCompanys}`);
  }

  create(employee: User): Observable<User> {
    return this.http.post<User>(this.url, employee);
  }

  update(employee: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${employee.id}`, employee);
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  delete(id: string): Observable<User> {
    return this.http.delete<User>(`${this.url}/${id}`);
  }

  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(this.url, {
      params: {
        email,
        password,
      },
    });
  }

  formatPhoneNumber(phone: string): string {
    return `${phone.slice(0, 2)}-${phone.slice(2, 7)}-${phone.slice(7)}`;
  }

  getCompaniesByIds(companyIds: string[]): Observable<User[]> {
    const params = companyIds.map(id => `idCompanys_like=${id}`).join('&');
    return this.http.get<User[]>(`${this.url}?${params}`);
  }
}
