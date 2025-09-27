import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-services.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  updateQuantity(productId: number, event: any) {
    const quantity = +event.target.value;
    this.cartService.updateQuantity(productId, quantity);
    this.cart = this.cartService.getCart(); 
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cart = this.cartService.getCart();
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  checkout() {
    alert('Checkout process coming soon 🛒✅');
  }
}
