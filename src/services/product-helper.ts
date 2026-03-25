import {map, Observable, switchMap} from 'rxjs';
import {ProductTypes} from '../models/product/ProductTypes';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from './product-service';


export function loadProduct<T>(
  type: ProductTypes,
  productService: ProductService,
  route: ActivatedRoute
): Observable<T> {
  return route.paramMap.pipe(
    map(params => params.get('id')),
    switchMap(id => productService.getProduct(type, id!))
  );
}
