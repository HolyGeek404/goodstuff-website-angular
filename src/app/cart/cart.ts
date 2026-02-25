import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {UserSessionService} from '../../services/UserSessionService';
import {User} from '../../models/user/user';
import {GoodStuffFunctionsService} from '../../services/GoodStuffFunctionsService';
import {CartItemResponse} from '../../models/cart/CartItemResponse';

interface CartItem {
  name: string;
  qty: number;
  price: number;
  img: string;
}

@Component({
  selector: 'app-cart',
  imports: [NgOptimizedImage],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  private userSession = inject(UserSessionService);
  private functionsService = inject(GoodStuffFunctionsService);
  user: User | null = this.userSession.getUser();

  cartItems: CartItem[] = [];

  constructor() {
    this.loadCart();
  }

  get total(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  private loadCart(): void {
    const userId = this.user?.email;
    if (!userId) {
      this.cartItems = [];
      return;
    }

    this.functionsService.getCart(userId).subscribe({
      next: (items) => {
        this.cartItems = items.map(item => this.mapCartItem(item));
      },
      error: (err) => {
        console.error('Error loading cart.', err);
        this.cartItems = [];
      }
    });
  }

  private mapCartItem(item: CartItemResponse): CartItem {
    const name = item.name ?? item.Name ?? 'Unknown product';
    const qty = item.quantity ?? item.Quantity ?? 0;
    const price = item.price ?? item.Price ?? 0;

    return {
      name,
      qty,
      price,
      img: 'categories/cpu.svg'
    };
  }
}
