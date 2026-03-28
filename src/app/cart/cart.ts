import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {UserSessionService} from '../../services/user-session-service';
import {User} from '../../models/user/user';
import {GoodStuffFunctionsService} from '../../services/GoodStuffFunctionsService';
import {CartItemResponse} from '../../models/cart/CartItemResponse';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

interface CartItem {
  name: string;
  qty: number;
  price: number;
  img: string;
}

@Component({
  selector: 'app-cart',
  imports: [NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  private functionsService = inject(GoodStuffFunctionsService);
  user: User | null = null
  orderState: 'idle' | 'success' | 'error' = 'idle';

  cartItems: CartItem[] = [];
  orderForm = new FormGroup({
    baseAddress: new FormGroup({
      street: new FormControl('', [Validators.required, Validators.minLength(3)]),
      city: new FormControl('', [Validators.required, Validators.minLength(2)]),
      postalCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{2}-\d{3}$/)]),
      country: new FormControl('Poland', [Validators.required])
    }),
    paymentMethod: new FormControl('', [Validators.required])
  });
  paymentMethods: string[] = ['Card', 'BLIK', 'PayPal', 'Cash on delivery'];

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

  submitOrder(): void {
    if (this.cartItems.length === 0 || this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      this.orderState = 'error';
      return;
    }

    this.orderState = 'success';
  }
}
