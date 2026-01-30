import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
  @Input() postId!: string;
  
  comments: any[] = [];
  newCommentContent: string = '';
  isLoading: boolean = false;

  constructor(
    private commentsService: CommentsService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    if (!this.postId) return;
    
    this.isLoading = true;
    this.commentsService.getCommentsByPostId(this.postId).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Błąd ładowania komentarzy:', err);
        this.isLoading = false;
      }
    });
  }

  addComment(): void {
    if (!this.newCommentContent.trim()) return;
    
    const currentUser = this.authService.currentUser;
    if (!currentUser) {
      alert('Musisz być zalogowany aby dodać komentarz');
      return;
    }

    const newComment = {
      content: this.newCommentContent.trim(),
      author: currentUser.userId,
      post: this.postId
    };

    this.commentsService.addComment(newComment).subscribe({
      next: (comment) => {
        this.comments.unshift(comment);
        this.newCommentContent = '';
      },
      error: (err) => {
        console.error('Błąd dodawania komentarza:', err);
        alert('Nie udało się dodać komentarza');
      }
    });
  }

  deleteComment(commentId: string): void {
    if (!confirm('Czy na pewno chcesz usunąć ten komentarz?')) return;

    this.commentsService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter(c => c._id !== commentId);
      },
      error: (err) => {
        console.error('Błąd usuwania komentarza:', err);
        alert('Nie udało się usunąć komentarza');
      }
    });
  }

  isCommentAuthor(comment: any): boolean {
    const currentUser = this.authService.currentUser;
    return currentUser && comment.author?._id === currentUser.userId;
  }

  getTimeAgo(date: string): string {
    const now = new Date();
    const commentDate = new Date(date);
    const diffMs = now.getTime() - commentDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Przed chwilą';
    if (diffMins < 60) return `${diffMins} min temu`;
    if (diffHours < 24) return `${diffHours} godz. temu`;
    if (diffDays < 7) return `${diffDays} dni temu`;
    return commentDate.toLocaleDateString('pl-PL');
  }
}