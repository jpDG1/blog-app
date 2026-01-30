import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent {
  @Output() postAdded = new EventEmitter<void>();

  title: string = '';
  content: string = '';
  image: string = '';
  category: string = 'Inne'; // ← ДОДАНО (default value)

  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Musisz być zalogowany aby dodać post');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const postData = {
      title: this.title,
      content: this.content,
      image: this.image,
      category: this.category // ← ДОДАНО
    };

    this.http.post(this.apiUrl, postData, { headers }).subscribe({
      next: (response) => {
        console.log('Post dodany:', response);
        this.title = '';
        this.content = '';
        this.image = '';
        this.category = 'Inne'; // ← ДОДАНО (reset)
        this.postAdded.emit();
        alert('Post dodany pomyślnie!');
      },
      error: (error) => {
        console.error('Błąd dodawania posta:', error);
        alert('Nie udało się dodać posta');
      }
    });
  }
}