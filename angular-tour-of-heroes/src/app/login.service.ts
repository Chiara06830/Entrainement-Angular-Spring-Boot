import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:8080/login';
  public user : User;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
  ) { }

  getUser(username : string, password : string) : Observable<User>{
    return this.http.get<User>(`${this.loginUrl}/search/findByUsernameAndPassword?username=${username}&password=${password}`).pipe(
      tap(u => {
        this.log(`connection of ${u.firstName} ${u.lastName}`);
        this.user = u;
        this.router.navigateByUrl('/dashboard');
      }),
      catchError(this.handleError<User>('getUser'))
    );
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
      alert('Bad username or password');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}
