import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import { ProductComponent } from './components/product/product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path: 'addcategory/:id', component: AddcategoryComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'products', component: ProductComponent },
  {path:'addproduct/:id',component:AddproductComponent},
  {path:'**',component:NotfoundComponent}
];
