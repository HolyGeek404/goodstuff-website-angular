import { Injectable } from '@angular/core';
import {map, switchMap} from 'rxjs';
import {ProductTypes} from '../models/product/ProductTypes';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from './product-service';

@Injectable({
  providedIn: 'root',
})
export class ProductHelper {
  constructor(private router: ActivatedRoute, private productService: ProductService) {}
  loadProducts<T>(type: ProductTypes,){
    this.router.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.productService.getProduct(type,id!)))
  }
}
