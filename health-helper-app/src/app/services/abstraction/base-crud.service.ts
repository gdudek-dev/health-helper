import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseCrudService<T> {

  protected apiUrl = "http://localhost:8081/api/" + this.url;

  constructor(protected http: HttpClient, protected url: String) { }

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }

  public getById(id: number): Observable<T> {
    return this.http.get<T>(this.apiUrl + "/" + id);
  }

  public create(object: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, object);
  }

  public update(object: T): Observable<T> {
    return this.http.put<T>(this.apiUrl, object);
  }

  public deleteById(id: number): Observable<T> {
    return this.http.delete<T>(this.apiUrl + "/" + id);
  }
}
