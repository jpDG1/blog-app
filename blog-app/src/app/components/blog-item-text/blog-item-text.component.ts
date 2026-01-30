import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-item-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-item-text.component.html',
  styleUrl: './blog-item-text.component.scss'
})
export class BlogItemTextComponent {
  @Input() text?: string;
  @Input() id?: string;

  getTruncatedText(): string {
    if (!this.text) return '';
    return this.text.length > 100 
      ? this.text.substring(0, 100) + '...' 
      : this.text;
  }
}