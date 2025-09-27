import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CategoryComponent } from "../category/category.component";
import { ProductComponent } from '../product/product.component';
import { CartService } from '../../services/cart-services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, CategoryComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchTerm: string = '';

  @Output() search = new EventEmitter<string>();
  @Output() categorySelected = new EventEmitter<number>();

  // cartItemCount property removed to avoid duplicate identifier error

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.updateCartCount();
  }

  onSearch() {
    this.search.emit(this.searchTerm);
  }

  onCategorySelected(categoryId: number) {
    this.categorySelected.emit(categoryId);
  }

  updateCartCount() {
    // No need to set cartItemCount, as the getter will always return the latest value
  }
  get cartItemCount() {
    return this.cartService.getCartCount();
  }
}
