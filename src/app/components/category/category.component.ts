import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
    categories: any[] = [];

  @Output() categorySelected = new EventEmitter<number>();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onCategoryChange(event: any) {
    const categoryId = Number(event.target.value);
    this.categorySelected.emit(categoryId);
  }
}


