import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryComponent } from "./components/category/category.component";
import { ProductComponent } from "./components/product/product.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, NavbarComponent, CategoryComponent, ProductComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    @ViewChild('prod') productComp!: ProductComponent;

  onCategorySelected(categoryId: number) {
    this.productComp.loadProductsByCategory(categoryId);
  }

  onSearch(searchTerm: string) {
  this.productComp.searchProducts(searchTerm);
}
}
