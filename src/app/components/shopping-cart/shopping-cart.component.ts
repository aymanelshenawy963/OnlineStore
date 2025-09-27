import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-services.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: any[] = [];
  router: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  updateQuantity(productId: number, event: any) {
    const newQuantity = +event.target.value;
    this.cartService.updateQuantity(productId, newQuantity);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cart = this.cartService.getCart();
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  checkout() {
    alert('Checkout process coming soon 🛒✅!');
  }
  continueShopping() {
    this.router.navigate(['/']); 
  }
}
