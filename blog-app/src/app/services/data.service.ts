import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  public getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  public create(post: any): Observable<any> {
    return this.http.post<any>(this.url, post);
  }

  public addPost(title: string, content: string, image: string): Observable<any> {
    return this.http.post<any>(this.url, { title, content, image });
  }

  public update(id: string, post: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, post);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}