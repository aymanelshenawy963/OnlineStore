import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];

  constructor() {
    if (this.isBrowser()) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private saveCart() {
    if (this.isBrowser()) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  getCart() {
    return this.cart;
  }

  addToCart(product: any, quantity: number = 1) {
    const existing = this.cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ ...product, quantity });
    }
    this.saveCart();
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cart.find(p => p.id === productId);
    if (item) {
      item.quantity = quantity;
    }
    this.saveCart();
  }

  getTotalPrice(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getCartCount(): number {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }
}
