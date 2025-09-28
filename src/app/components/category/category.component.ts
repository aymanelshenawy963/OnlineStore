import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
    categories: any[] = [];


  constructor(private api: ApiService ,private router: Router) {}



  ngOnInit(): void {
    this.api.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
@Output() categorySelected = new EventEmitter<string>();

onCategoryChange(event: any) {
  const categoryId = (event.target as HTMLSelectElement).value;

  this.categorySelected.emit(categoryId);

  this.router.navigate(['/products'], {
    queryParams: { category: categoryId }
  });
}

}




