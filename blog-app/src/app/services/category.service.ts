import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private selectedCategorySubject = new BehaviorSubject<string>('All');
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  setCategory(category: string): void {
    this.selectedCategorySubject.next(category);
  }

  getCategory(): string {
    return this.selectedCategorySubject.value;
  }
}