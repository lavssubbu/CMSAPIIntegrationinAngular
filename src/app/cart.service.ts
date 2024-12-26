import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from './Book';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Book[] = [];
  
  constructor() {}

  // Method to add a book to the cart
  addToCart(book: Book): void {
    console.log('Adding to cart:', book);
    this.cart.push(book);
    console.log('Current cart:', this.cart);
  }

  // Method to get the cart items
  getCart(): Book[] {
    return this.cart;
  }

  // Method to calculate the total price of items in the cart
  getTotalPrice(): number {
    return this.cart.reduce((total, book) => total + book.price, 0);
  }
}
