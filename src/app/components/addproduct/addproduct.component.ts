import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
 
    categories: any[] = [];
    pageId:any;
    file:any;

  productForm=new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3)]),
    price: new FormControl('',[Validators.required,Validators.min(1)]),
    categoryId: new FormControl('',[Validators.required]),
    image: new FormControl('',[Validators.required])

  });

  constructor(private api : ApiService , private router:Router,public activatedRoute:ActivatedRoute){
    this.pageId = this.activatedRoute.snapshot.params['id'];    
  }

 ngOnInit(): void {
  this.api.getCategories().subscribe((categories) => {
      this.categories = categories;
    })
    if(this.pageId!=0){
      this.api.getProductById(this.pageId).subscribe((data) => {
        this.productname.setValue(data.name);
        this.productPrice.setValue(data.price);
        this.productCategoryId.setValue(data.categoryId);
        this.productImage.setValue(data.image);
      });
    }
 }
// getters part 
 get productname(){
  return this.productForm.controls['name'];
 }
 get productPrice(){
  return this.productForm.controls['price'];
 }

//  get productCategoryName(){
//   return this.productForm.controls['categoryName'];
//  }

get productCategoryId() {
 return this.productForm.controls['categoryId'];
}

 get productImage(){
  return this.productForm.controls['image'];
 }
//  getters part end 
onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    // get only the file name + extension
    const fileName = file.name; 
    this.productForm.patchValue({ image: fileName });
  }
}

 
  onSubmit(productForm:FormGroup){
if(productForm.valid){
  if(this.pageId==0){//add new product 
    this.api.addProduct(
    {
  name : this.productname.value,
  price: this.productPrice.value,
  categoryId: this.productCategoryId.value,
  image: this.productImage.value
}).subscribe({
      next:()=>{this.router.navigate(['/products']);
    this.productForm.reset();
      }
    });
  }
  else{// edite existing product
    this.api.editProduct(this.pageId,{
      name : this.productname.value,
      price: this.productPrice.value,
      categoryId: this.productCategoryId.value,
      image: this.productImage.value 
    }).subscribe({
      next:()=>{this.router.navigate(['/detialedproduct',this.pageId]);}
    })
    }

}
  }

 

}
