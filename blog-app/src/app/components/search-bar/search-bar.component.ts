import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit {
  public filterText: string = '';

  @Output() name = new EventEmitter<string>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filterText = params['name'] || '';
      if (this.filterText) {
        this.name.emit(this.filterText);
      }
    });
  }

  sendFilter(): void {
    console.log('🔍 Search filter:', this.filterText);
    
    this.name.emit(this.filterText);
    

    const currentUrl = this.router.url.split('?')[0];
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { 
        name: this.filterText?.toLowerCase() || null,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true 
    });
  }
}