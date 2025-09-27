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

  @Output() categorySelected = new EventEmitter<number>();

  constructor(private api: ApiService ,private router: Router) {}



  ngOnInit(): void {
    this.api.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onCategoryChange(event: any) {
    const categoryId =Number((event.target as HTMLSelectElement).value);
     if (isNaN(categoryId)) {
    return; // ignore if no value selected
  }
    if(categoryId ===-1){
      this.categorySelected.emit(categoryId);
      this.router.navigate(['/addcategory/0']);
    }

    else{
      this.categorySelected.emit(categoryId);
      this.router.navigate(['/products'], { queryParams: { category: categoryId } });
    }
  }

}


