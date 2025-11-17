import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BaseProduct} from '../models/product/BaseProduct';

@Injectable({ providedIn: 'root' })
export class GoodStuffFunctionsService {
  private baseUrl = 'http://localhost:7257/api/product'; // Azure Function base URL

  constructor(private http: HttpClient) {}

  /**
   * Generic method to fetch any product category.
   *
   * Example: getProductsByCategory<Gpu>('Gpus')
   */
  getProductsByCategory<T extends BaseProduct>(category: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${category}`, {});
  }
}
