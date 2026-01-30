import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Rating {
  postId: string;
  ratings: number[];
}

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private readonly STORAGE_KEY = 'blog_ratings';
  private ratings: Rating[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadRatings();
  }

  private loadRatings(): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.ratings = JSON.parse(stored);
        console.log('Ratings loaded from localStorage:', this.ratings);
      }
    }
  }

  private saveRatings(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.ratings));
      console.log('Ratings saved to localStorage:', this.ratings);
    }
  }

  addRating(postId: string, rating: number): void {
    console.log('addRating called:', postId, rating);
    
    const existingRating = this.ratings.find(r => r.postId === postId);
    
    if (existingRating) {
      existingRating.ratings.push(rating);
      console.log('Added to existing ratings:', existingRating);
    } else {
      this.ratings.push({ postId, ratings: [rating] });
      console.log('Created new rating entry');
    }
    
    this.saveRatings();
  }

  getAverageRating(postId: string): number {
    const rating = this.ratings.find(r => r.postId === postId);
    if (!rating || rating.ratings.length === 0) {
      return 0;
    }
    const sum = rating.ratings.reduce((a, b) => a + b, 0);
    const average = sum / rating.ratings.length;
    console.log('getAverageRating for', postId, ':', average);
    return average;
  }

  getVotesCount(postId: string): number {
    const rating = this.ratings.find(r => r.postId === postId);
    const count = rating ? rating.ratings.length : 0;
    console.log('getVotesCount for', postId, ':', count);
    return count;
  }

  getRatings(): Rating[] {
    return this.ratings;
  }
}