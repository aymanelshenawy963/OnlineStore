import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-services.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit {
  products: any[] = [];

  constructor(
    private api: ApiService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  addToCart(product: any) {
    this.cartService.addToCart(product , product.quantity);
    product.quantity = 1; 
  }


ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    if (params['category']) {
      this.loadProductsByCategory(+params['category']);
    } else if (params['search']) {
      this.searchProducts(params['search']);
    } else {
      this.api.getProducts().subscribe(data => {
        this.products = data.map(p => ({
          ...p,
          quantity: 1
        }));
      });
    }
  });
}

  loadProductsByCategory(categoryId: number) {
    this.api.getProductsByCategory(categoryId).subscribe(data => {
      this.products = data.map(p => ({
        ...p,
        quantity: 1
      }));
    });
  }

  searchProducts(term: string) {
    this.api.getProducts().subscribe(data => {
      this.products = data
        .filter(p => p.name.toLowerCase().includes(term.toLowerCase()))
        .map(p => ({
          ...p,
          quantity: 1
        }));
    });
  }

increaseQuantity(product: any) {
    product.quantity++;
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }
}



