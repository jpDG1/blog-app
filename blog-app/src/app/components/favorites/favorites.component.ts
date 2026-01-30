import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { DataService } from '../../services/data.service';
import { BlogItemComponent } from '../blog-item/blog-item.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [BlogItemComponent, CommonModule, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  favoritePosts: any[] = [];
  loading: boolean = true;

  constructor(
    private favoritesService: FavoritesService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    const favoriteIds = this.favoritesService.getFavorites();
    
    console.log('Favorite IDs:', favoriteIds);
    
    if (favoriteIds.length === 0) {
      this.loading = false;
      return;
    }

    this.dataService.getAll().subscribe({
      next: (posts: any) => {
        console.log('All posts:', posts);
        
        this.favoritePosts = posts.filter((post: any) => 
          favoriteIds.includes(post._id)
        );
        
        console.log('Filtered favorite posts:', this.favoritePosts);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.loading = false;
      }
    });
  }

  onPostRemoved(): void {
    this.loadFavorites();
  }
}