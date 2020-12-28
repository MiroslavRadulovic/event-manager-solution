import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User, UserAdapter } from '../models/user.model';
import * as moment from 'moment';

@Injectable()
export class UserDataService {
  constructor(private http: HttpClient, private adapter: UserAdapter) {}

  get(): Observable<User[]> {
    console.log('get');
    return this.http.get<User[]>('users').pipe(
      map((data: any[]) => data.map((item) => this.adapter.adapt(item))),
      catchError(this.handleError)
    );
  }

  save(user: User): Observable<User> {
    return this.http
      .post('users', {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
      })
      .pipe(
        map((item) => this.adapter.adapt(item)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const customErrorMessage = 'An unknown error occurred!';
    return throwError(customErrorMessage);
  }
}
