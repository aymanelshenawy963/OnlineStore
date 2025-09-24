import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit {
  products: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getProducts().subscribe(data => {
      this.products = data;
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





