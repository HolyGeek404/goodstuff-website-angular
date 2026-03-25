import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {BaseProduct} from '../models/product/BaseProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient)

  public getProductsBaseInfo(type: string): Observable<BaseProduct[]>
  {
    return this.http.get<BaseProduct[]>(environment.api_gateway_url+"/product/"+type)
  }

  public getProduct<T>(type: string, id: string): Observable<T>
  {
    return this.http.get<T>(`${environment.api_gateway_url}/product/${type}/${id}`)
  }
}
