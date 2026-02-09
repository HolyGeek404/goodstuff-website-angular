import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Cpu} from '../models/product/Cpu';
import {Gpu} from '../models/product/Gpu';
import {ProductTypes} from '../models/product/ProductTypes';
import {Cooler} from '../models/product/Cooler';
import {BaseProduct} from '../models/product/BaseProduct';
import {SignUpRequest} from '../models/user/SignUpRequest';
import {AccountVerificationRequest} from '../models/user/AccountVerification';
import {User} from '../models/user/user';
import {ProductFilters} from '../models/product/ProductFilters';

@Injectable({ providedIn: 'root' })
export class GoodStuffFunctionsService {
  private baseUrl = '/api/gateway/';
  private authOptions = { withCredentials: true, responseType: 'text' as const };

  constructor(private http: HttpClient) {}

  getProducts(types: ProductTypes): Observable<BaseProduct[]> {
    switch (types) {
      case ProductTypes.CPU:
        return this.http.get<Cpu[]>(`${this.baseUrl}Product/CPU`);
      case ProductTypes.GPU:
        return this.http.get<Gpu[]>(`${this.baseUrl}product/GPU`);
      case ProductTypes.COOLER:
        return this.http.get<Cooler[]>(`${this.baseUrl}product/COOLER`);
      default:
        return this.http.get<Cpu[]>(`${this.baseUrl}product/CPU`);
    }
  }

  getProductFilters(types: ProductTypes): Observable<ProductFilters> {
    return this.http.get<ProductFilters>(`${this.baseUrl}product/${types}/filters`);
  }

  signIn(email: string, password: string): Observable<string> {
    return this.http.post(`${this.baseUrl}user/signin`, {email, password}, this.authOptions);
  }
  signOut(): Observable<string> {
    return this.http.post(`${this.baseUrl}user/signout`, {}, this.authOptions);
  }
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}user/me`, { withCredentials: true });
  }
  signUp(signUp: SignUpRequest): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}user/signup`, signUp);
  }
  accountVerification(accVerf: AccountVerificationRequest): Observable<boolean>{
    return this.http.post<boolean>(`${this.baseUrl}user/accountverification`, accVerf);

  }
}
