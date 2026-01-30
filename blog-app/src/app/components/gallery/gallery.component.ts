import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  images: any[] = [];
  selectedImage: string | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.dataService.getAll().subscribe((posts: any) => {
      this.images = posts.map((post: any) => ({
        url: post.image,
        title: post.title,
        id: post.id
      }));
    });
  }

  openImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

  closeImage(): void {
    this.selectedImage = null;
  }
}