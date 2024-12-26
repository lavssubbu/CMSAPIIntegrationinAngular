import { Component, Input } from '@angular/core';
import { Book } from '../Book';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterModule],
   templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: Book[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    console.log('Cart Component Loaded');
    this.cart = this.cartService.getCart();
    this.totalPrice = this.cartService.getTotalPrice();
    console.log('Cart:', this.cart);
    console.log('Total Price:', this.totalPrice);
  }
}
