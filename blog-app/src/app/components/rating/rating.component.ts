import { Component, Input, OnInit } from '@angular/core';
import { RatingService } from '../../services/rating.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent implements OnInit {
  @Input() postId!: string;
  @Input() readonly: boolean = false;

  stars: number[] = [1, 2, 3, 4, 5];
  hoverRating: number = 0;
  currentRating: number = 0;
  averageRating: number = 0;
  votesCount: number = 0;

  constructor(private ratingService: RatingService) {}

  ngOnInit(): void {
    console.log('Rating component initialized for post:', this.postId);
    this.loadRating();
  }

  loadRating(): void {
    if (!this.postId) {
      console.error('No postId provided!');
      return;
    }
    
    this.averageRating = this.ratingService.getAverageRating(this.postId);
    this.votesCount = this.ratingService.getVotesCount(this.postId);
    console.log('Loaded rating:', this.averageRating, 'Votes:', this.votesCount);
  }

  onStarHover(rating: number): void {
    if (!this.readonly) {
      this.hoverRating = rating;
    }
  }

  onStarLeave(): void {
    this.hoverRating = 0;
  }

  onStarClick(rating: number): void {
    if (this.readonly) return;
    
    console.log('Star clicked:', rating, 'for post:', this.postId);
    this.currentRating = rating;
    this.ratingService.addRating(this.postId, rating);
    this.loadRating();
    console.log('After save - Average:', this.averageRating, 'Votes:', this.votesCount); // ДОДАНО
  }

  getDisplayRating(): number {
    return this.hoverRating || this.averageRating;
  }
}