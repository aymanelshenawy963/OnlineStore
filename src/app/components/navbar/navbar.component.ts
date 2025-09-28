import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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

  // cartItemCount property removed to avoid duplicate identifier error

  constructor(private cartService: CartService,private router: Router) {}

  ngOnInit(): void {
    this.updateCartCount();
  }
onSearch(event?: Event) {
  if (event) event.preventDefault(); // يمنع الفورم من reload
  if (!this.searchTerm.trim()) return;

  console.log('Searching for:', this.searchTerm);
  this.search.emit(this.searchTerm);

  // لو عاوز تنقل لصفحة البحث
  this.router.navigate(['/products'], { queryParams: { search: this.searchTerm } });
}





onCategorySelected(categoryId: any) {
  this.router.navigate(['/products'], { queryParams: { category: String(categoryId) } });
}

  updateCartCount() {
    // No need to set cartItemCount, as the getter will always return the latest value
  }
  get cartItemCount() {
    return this.cartService.getCartCount();
  }
}
