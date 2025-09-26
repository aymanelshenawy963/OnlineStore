import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { get } from 'http';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcategory',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.css'
})
export class AddcategoryComponent implements  OnInit {
  categoriesid:any[]=[];
  categoriesname:any[]=[];

  myform=new FormGroup({
    id: new FormControl('',[Validators.required,this.idvalidation.bind(this)]),
    name: new FormControl('',[Validators.required,this.namevalidation.bind(this)])
  });

  constructor(private api : ApiService , private router:Router){

  }
  ngOnInit(): void {
  this.getcategoriesfromdb();
  // this.categoriesid.push(0);

  }

  // validator functions 

  getcategoriesfromdb(){
   return this.api.getCategories().subscribe(
    (categories) => {
      this.categoriesid = categories.map((category) => Number(category.id));
      this.categoriesname=categories.map((category) => category.name);
    
      this.categoryId.updateValueAndValidity();
      this.categoryName.updateValueAndValidity();
    }
    ,
    (error) => {
      console.error('Error fetching categories:', error);
    }
   );
  }

  idvalidation(control:FormControl):  ValidationErrors|null {
    const val = Number(control.value);

     if (!control.value) {
    return null;
  }

    if(this.categoriesid.includes(val)){
      return {idexists:true};
    }
    if(val<1){
      return{negative:true};
    }
    return null;
  }

  namevalidation(control:FormControl) :ValidationErrors|null{
    if(this.categoriesname.includes(control.value)){
      return {nameexists:true};
    }
    return null;

  }

// add category function 
  get categoryId() {
    return this.myform.controls['id'];
  }

  get categoryName(){
    return this.myform.controls['name'];
  }

  
  addcategory(){
    const category = {
      id: this.categoryId.value,
      name: this.categoryName.value,
    };
    this.api.addCategory(category).subscribe(
      () => {
        console.log('Category added successfully');
      },
      (error) => {
        console.error('Error adding category:', error);
      }
    );

  }
  

  onSubmit(myform:FormGroup){
    if(myform.valid){
      this.addcategory();
      this.router.navigate(['/home']);
    }
}

}


