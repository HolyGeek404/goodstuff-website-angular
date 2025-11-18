import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Cpu} from '../models/product/Cpu';
import {Gpu} from '../models/product/Gpu';
import {ProductTypes} from '../models/product/ProductTypes';
import {Cooler} from '../models/product/Cooler';
import {BaseProduct} from '../models/product/BaseProduct';

@Injectable({ providedIn: 'root' })
export class GoodStuffFunctionsService {
  private baseUrl = 'http://localhost:7257/api/products'; // Azure Function base URL

  constructor(private http: HttpClient) {}

  getProducts(category: ProductTypes): Observable<BaseProduct[]> {
    switch (category) {
      case ProductTypes.CPU:
        return this.http.get<Cpu[]>(`${this.baseUrl}/CPU`);
      case ProductTypes.GPU:
        return this.http.get<Gpu[]>(`${this.baseUrl}/GPU`);
      case ProductTypes.COOLER:
        return this.http.get<Cooler[]>(`${this.baseUrl}/COOLER`);
      default:
        return this.http.get<BaseProduct[]>(`${this.baseUrl}/CPU`);
    }
  }


  private getCpus(): Observable<Cpu[]> {
    return this.http.get<Cpu[]>(`${this.baseUrl}/CPU`);
  }

  private getGpus(): Observable<Gpu[]> {
    return this.http.get<Gpu[]>(`${this.baseUrl}/GPU`);
  }
}
