import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { CategoryComponent } from './components/category/category.component';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'categories', component: CategoryComponent },
  // { path: 'products', component: ProductComponent },
  // { path: 'categories/:categoryName', component: CategoryComponent },
  { path: '**', redirectTo: '' }
];
