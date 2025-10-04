import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-services.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
    private router: Router,
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
      this.loadProductsByCategory(params['category']);
    } else if (params['search']) {
      this.search(params['search']);
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


  loadProductsByCategory(categoryId: any) {
    this.api.getProductsByCategory(categoryId).subscribe(data => {
      this.products = data.map(p => ({
        ...p,
        quantity: 1
      }));
    });
  }




search(term: string) {
  const lowerTerm = term.toLowerCase();

  this.api.getProducts().subscribe(products => {
    this.api.getCategories().subscribe(categories => {

      // نضيف اسم التصنيف لكل منتج
      products = products.map(p => ({
        ...p,
        categoryName: categories.find(c => c.id == p.categoryId)?.name || '',
        quantity: 1
      }));

      // البحث بالاسم أو التصنيف
      const results = products.filter(p =>
        p.name.toLowerCase().includes(lowerTerm) ||
        p.categoryName.toLowerCase().includes(lowerTerm)
      );

      if (results.length > 0) {
        this.products = results;
      } else {
        this.router.navigate(['/notfoundproduct']);
      }
    });
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



