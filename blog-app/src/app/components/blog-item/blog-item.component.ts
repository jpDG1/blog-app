import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlogItemImageComponent } from '../blog-item-image/blog-item-image.component';
import { BlogItemTextComponent } from '../blog-item-text/blog-item-text.component';
import { FavoritesService } from '../../services/favorites.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RatingComponent } from '../rating/rating.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-item',
  standalone: true,
  imports: [
    BlogItemImageComponent, 
    BlogItemTextComponent, 
    CommonModule, 
    RatingComponent,
    RouterModule
  ],
  templateUrl: './blog-item.component.html',
  styleUrl: './blog-item.component.scss'
})
export class BlogItemComponent implements OnInit {
  @Input() image?: string;
  @Input() text?: string;
  @Input() title?: string;
  @Input() id?: string;
  @Input() authorId?: string;
  @Input() category?: string;

  @Output() editPost = new EventEmitter<string>();
  @Output() deletePost = new EventEmitter<string>();

  constructor(
    private favoritesService: FavoritesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('BlogItem initialized with id:', this.id);
  }

  getCategoryIcon(): string {
    const icons: any = {
      'Technologia': '🖥️',
      'Podróże': '✈️',
      'Jedzenie': '🍲',
      'Sport': '🏀',
      'Inne': '📌'
    };
    return icons[this.category || 'Inne'] || '📌';
  }

  toggleFavorite(): void {
    if (this.id) {
      this.favoritesService.toggleFavorite(this.id);
    }
  }

  isFavorite(): boolean {
    return this.id ? this.favoritesService.isFavorite(this.id) : false;
  }

  isAuthor(): boolean {
    const currentUser = this.authService.currentUser;
    return currentUser && this.authorId === currentUser.userId;
  }

  onEdit(): void {
    if (this.id) {
      this.editPost.emit(this.id);
    }
  }

  onDelete(): void {
    if (this.id) {
      const confirmed = confirm('Czy na pewno chcesz usunąć ten post?');
      if (confirmed) {
        this.deletePost.emit(this.id);
      }
    }
  }
}