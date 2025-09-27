import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { get } from 'http';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-addcategory',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.css'
})
export class AddcategoryComponent implements  OnInit {
  categoriesid:any[]=[];
  categoriesname:any[]=[];
  categories:any[]=[];
  pageId:any;

  myform=new FormGroup({
    // id: new FormControl('',[Validators.required,this.idvalidation.bind(this)]),
    name: new FormControl('',[Validators.required,this.namevalidation.bind(this)])
  });
    get categoryName(){
    return this.myform.controls['name'];
  }

  constructor(private api : ApiService , private router:Router , public activatedroute:ActivatedRoute){
   this.pageId = this.activatedroute.snapshot.params['id'];
    }
  ngOnInit(): void {
  
  this.activatedroute.paramMap.subscribe(params => {
    this.pageId = params.get('id');
    this.getcategoriesfromdb();
  });
  }

  // validator functions 

  getcategoriesfromdb(){
   return this.api.getCategories().subscribe(
    (categories) => {
      this.categories = categories;
      this.categoriesid = categories.map((category) => category.id);
      this.categoriesname=categories.map((category) => category.name);

       if (this.pageId != 0) {
        const category = this.categories.find(c => c.id == this.pageId);
        if (category) {
          this.categoryName.setValue(category.name);
        }
      }
      else{
         this.myform.reset();

      }
    
      // this.categoryId.updateValueAndValidity();
      this.categoryName.updateValueAndValidity();
    }
    ,
    (error) => {
      console.error('Error fetching categories:', error);
    }
   );
  }

  // idvalidation(control:FormControl):  ValidationErrors|null {
  //   const val = Number(control.value);

  //    if (!control.value) {
  //   return null;
  // }

  //   if(this.categoriesid.includes(val)){
  //     return {idexists:true};
  //   }
  //   if(val<1){
  //     return{negative:true};
  //   }
  //   return null;
  // }

  namevalidation(control:FormControl) :ValidationErrors|null{
    if(this.categoriesname.includes(control.value)){
      return {nameexists:true};
    }
    return null;

  }

// add category function 
  // get categoryId() {
  //   return this.myform.controls['id'];
  // }



  
  addcategory(){
    const category = {
      // id: this.categoryId.value,
      name: this.categoryName.value,
    };
    this.api.addCategory(category).subscribe(
      () => {
        console.log('Category added successfully');
         this.getcategoriesfromdb();
         this.router.navigate(['/addcategory/0']);
         this.myform.reset();
      },
      (error) => {
        console.error('Error adding category:', error);
      }
    );

  }
  

  onSubmit(myform:FormGroup){
    if(myform.valid){
      if(this.pageId==0){
       this.addcategory();
     
     }
     else{
      this.api.editCategory(this.pageId,myform.value).subscribe({
        next:()=>{
      this.router.navigate(['/addcategory/0']);
        }
      });
     }
    }
}


 deleteCategory(e:any){
this.api.deleteCategory(e).subscribe({
  next:()=>{
    this.getcategoriesfromdb();
  },error:()=>{
  }
})
 }



}
