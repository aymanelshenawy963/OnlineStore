import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-detialed-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detialed-product.component.html',
  styleUrl: './detialed-product.component.css'
})
export class DetialedProductComponent {
  Product:any;
  pageID:any;
  Category:any;
  constructor(private api: ApiService, private avtivatedRoute: ActivatedRoute, private router: Router) {
    this.pageID = this.avtivatedRoute.snapshot.params['id'];
    this.api.getProductById(this.pageID).subscribe((data) => {
      this.Product = data;
      this.api.getCategoriesById(this.Product.categoryId).subscribe((data) => {
      this.Category = data;
    });
    });
  
  } 

  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe(
      () => {this.router.navigate(['/products']);
        alert('Product deleted successfully');
    });


  }

}
