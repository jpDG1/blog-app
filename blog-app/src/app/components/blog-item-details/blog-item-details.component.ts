import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from '../comments/comments.component'; 

@Component({
  selector: 'app-blog-item-details',
  standalone: true,
  imports: [CommonModule, RouterModule, CommentsComponent], 
  templateUrl: './blog-item-details.component.html',
  styleUrl: './blog-item-details.component.scss'
})
export class BlogItemDetailsComponent implements OnInit {
  public image: string = '';
  public text: string = '';
  public title: string = '';
  public postId: string = ''; 
  public loading: boolean = true;
  public error: string = '';

  constructor(
    private service: DataService, 
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      
      console.log('Blog detail ID:', id);
      
      if (!id || id === 'undefined') {
        console.warn('No valid ID provided');
        this.error = 'Nieprawidłowy ID posta';
        this.loading = false;
        return;
      }

      this.postId = id;

      this.service.getById(id).subscribe({
        next: (res: any) => {
          console.log('Post loaded:', res);
          this.image = res.image;
          this.text = res.content; 
          this.title = res.title;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading post:', err);
          this.error = 'Nie udało się załadować posta';
          this.loading = false;
        }
      });
    });
  }
}