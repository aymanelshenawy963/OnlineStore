import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import { ProductComponent } from './components/product/product.component';

// import { ProductComponent } from './components/product/product.component';
// import { NotfoundComponent } from './components/notfound/notfound.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path: 'addcategory', component: AddcategoryComponent },
  //  { path: 'products', component: ProductComponent },
  // {path:'**',component:NotfoundComponent}
];
