import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogComponent } from '../blog/blog.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { FavoritesService } from '../../services/favorites.service';
import { CategoryService } from '../../services/category.service';
import { RouterModule } from '@angular/router';
import { GalleryComponent } from '../gallery/gallery.component';

@Component({
  selector: 'app-blog-home',
  standalone: true,
  imports: [BlogComponent, SearchBarComponent, CommonModule, RouterModule, GalleryComponent],
  templateUrl: './blog-home.component.html',
  styleUrl: './blog-home.component.scss'
})
export class BlogHomeComponent implements OnInit {
  isDarkMode: boolean = false;
  favoritesCount: number = 0;
  showGallery: boolean = false;
  selectedCategory: string = 'All';
  searchText: string = ''; 

  @ViewChild(BlogComponent) blogComponent!: BlogComponent;

  constructor(
    private themeService: ThemeService,
    private favoritesService: FavoritesService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });

    this.updateFavoritesCount();
    
    this.categoryService.selectedCategory$.subscribe(category => {
      this.selectedCategory = category;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  updateFavoritesCount(): void {
    this.favoritesCount = this.favoritesService.getFavorites().length;
  }

  onFilterChange(searchText: string): void {
    console.log('🔍 Filter changed in blog-home:', searchText);
    this.searchText = searchText;
    
    if (this.blogComponent) {
    }
  }

  toggleGallery(): void {
    this.showGallery = !this.showGallery;
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.categoryService.setCategory(category);
    console.log('Filter by category:', category);
  }
}