import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 5;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): number[] {
    const pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    console.log('Total pages:', this.totalPages, 'Array:', pagesArray);
    return pagesArray;
  }

  changePage(page: number): void {
    console.log('PaginationComponent.changePage:', page);
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    } else {
      console.log('Page change blocked. Current:', this.currentPage, 'Requested:', page);
    }
  }

  previousPage(): void {
    console.log('Previous clicked, current:', this.currentPage);
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    console.log('Next clicked, current:', this.currentPage);
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }
}
