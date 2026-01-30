import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FavoritesService } from '../../services/favorites.service';
import { RatingService } from '../../services/rating.service';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule 
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: any = null;
  userPosts: number = 0;
  favoritesCount: number = 0;
  totalRatings: number = 0;
  joinDate: string = 'Styczeń 2026';

  constructor(
    private authService: AuthService,
    private favoritesService: FavoritesService,
    private ratingService: RatingService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    console.log('Current user:', this.user);
    this.loadUserStats();
  }

  loadUserStats(): void {
    this.blogService.getAllBlogs().subscribe({
      next: (posts: any[]) => {
        if (this.user) {
          this.userPosts = posts.filter((p: any) => 
            p.author?._id === this.user.userId
          ).length;
        }
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.userPosts = 0;
      }
    });

    this.favoritesCount = this.favoritesService.getFavorites().length;

    const allRatings = this.ratingService.getRatings();
    this.totalRatings = allRatings.reduce((sum, r) => sum + r.ratings.length, 0);
  }
}