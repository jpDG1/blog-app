import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private url = 'http://localhost:3000/api/comments';

  constructor(private http: HttpClient) { }

  getCommentsByPostId(postId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/post/${postId}`);
  }

  addComment(comment: any): Observable<any> {
    return this.http.post<any>(this.url, comment);
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${commentId}`);
  }
}