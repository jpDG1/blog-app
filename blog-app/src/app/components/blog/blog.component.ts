import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogItemComponent } from '../blog-item/blog-item.component';
import { AddPostComponent } from '../add-post/add-post.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { CategoryService } from '../../services/category.service';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  image?: string;
  category?: string;
  author?: {
    _id: string;
    name?: string;
    username?: string;
    email?: string;
  };
  createdAt?: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BlogItemComponent,
    AddPostComponent,
    PaginationComponent
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit, OnChanges {
  items: BlogPost[] = [];
  filterText: string = '';
  @Input() searchFilter: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 3;
  showGallery: boolean = false;
  editingPostId: string | null = null;
  selectedCategory: string = 'All';
  
  editForm = {
    title: '',
    content: '',
    image: ''
  };

  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    
    this.categoryService.selectedCategory$.subscribe(category => {
      this.selectedCategory = category;
      this.currentPage = 1; 
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchFilter']) {
      console.log('🔍 Search filter changed:', this.searchFilter);
      this.filterText = this.searchFilter; 
      this.currentPage = 1; 
    }
  }

  loadPosts(): void {
    this.http.get<BlogPost[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.items = data;
        console.log('Posty załadowane:', this.items);
      },
      error: (error) => {
        console.error('Błąd ładowania postów:', error);
      }
    });
  }

  getFilteredItems(): BlogPost[] {
    let filtered = this.items;
    if (this.filterText) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(this.filterText.toLowerCase()) ||
        item.content.toLowerCase().includes(this.filterText.toLowerCase())
      );
    }

    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === this.selectedCategory);
    }

    return filtered;
  }

  getDisplayedItems(): BlogPost[] {
    const filtered = this.getFilteredItems();
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return filtered.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleGallery(): void {
    this.showGallery = !this.showGallery;
  }

  onPostAdded(): void {
    this.loadPosts();
  }

  onEditPost(postId: string): void {
    const post = this.items.find(p => p._id === postId);
    if (post) {
      this.editingPostId = postId;
      this.editForm = {
        title: post.title,
        content: post.content,
        image: post.image || ''
      };
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  saveEditedPost(): void {
    if (!this.editingPostId) return;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.put(`${this.apiUrl}/${this.editingPostId}`, this.editForm, { headers })
      .subscribe({
        next: () => {
          alert('Post zaktualizowany!');
          this.cancelEdit();
          this.loadPosts();
        },
        error: (error) => {
          console.error('Błąd aktualizacji:', error);
          alert('Nie udało się zaktualizować posta');
        }
      });
  }

  cancelEdit(): void {
    this.editingPostId = null;
    this.editForm = { title: '', content: '', image: '' };
  }

  onDeletePost(postId: string): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.delete(`${this.apiUrl}/${postId}`, { headers })
      .subscribe({
        next: () => {
          alert('Post usunięty!');
          this.loadPosts();
        },
        error: (error) => {
          console.error('Błąd usuwania:', error);
          alert('Nie udało się usunąć posta');
        }
      });
  }
}