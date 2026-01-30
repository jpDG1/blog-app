import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  image?: string;
  author?: {
    _id: string;
    username: string;
  };
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  getAllBlogs(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.apiUrl);
  }
}