import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:8080/login';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  getUser(username : string, password : string) : Observable<User>{
    return this.http.get<User>(`${this.loginUrl}/search/findByUsernameAndPassword?username=${username}&password=${password}`).pipe(
      map(user => {
        this.log(`connection of ${user.firstName} ${user.lastName}`);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }),
      catchError(this.handleError<User>('getUser'))
    );
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      if(error.status === 404)
        alert('Bad username or password');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}
