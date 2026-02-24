import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {UserSessionService} from '../../services/UserSessionService';
import {User} from '../../models/user/user';

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
  user: User | null = this.userSession.getUser();

  cartItems: CartItem[] = [
    {
      name: 'NVIDIA GeForce RTX 4070 Super',
      qty: 1,
      price: 649.99,
      img: 'categories/gpu.svg'
    },
    {
      name: 'DeepCool AK620 CPU Cooler',
      qty: 2,
      price: 69.99,
      img: 'categories/cooler.svg'
    }
  ];

  get total(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  }
}
