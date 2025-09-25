import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CategoryComponent } from "../category/category.component";
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, CategoryComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchTerm: string = '';

  @Output() search = new EventEmitter<string>();
  @Output() categorySelected = new EventEmitter<number>();

  onSearch() {
    this.search.emit(this.searchTerm);
  }

  onCategorySelected(categoryId: number) {
    this.categorySelected.emit(categoryId);
  }
}
