import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
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
    this.cartService.addToCart(product);
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.loadProductsByCategory(+params['category']);
      } else if (params['search']) {
        this.searchProducts(params['search']);
      } else {
        this.api.getProducts().subscribe(data => {
          this.products = data;
        });
      }
    });
  }

    loadProductsByCategory(categoryId: number) {
    this.api.getProductsByCategory(categoryId).subscribe(data => {
      this.products = data;
    });
  }

  searchProducts(term: string) {
  this.api.getProducts().subscribe(data => {
    this.products = data.filter(p =>
      p.name.toLowerCase().includes(term.toLowerCase())
    );
  });
}
}





