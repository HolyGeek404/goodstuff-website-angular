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

@Injectable({ providedIn: 'root' })
export class GoodStuffFunctionsService {
  private baseUrl = 'http://localhost:7257/api/proxy/';
  private authOptions = { withCredentials: true, responseType: 'text' as const };

  constructor(private http: HttpClient) {}

  getProducts(category: ProductTypes): Observable<BaseProduct[]> {
    switch (category) {
      case ProductTypes.CPU:
        return this.http.get<Cpu[]>(`${this.baseUrl}product/CPU`);
      case ProductTypes.GPU:
        return this.http.get<Gpu[]>(`${this.baseUrl}product/GPU`);
      case ProductTypes.COOLER:
        return this.http.get<Cooler[]>(`${this.baseUrl}product/COOLER`);
      default:
        return this.http.get<Cpu[]>(`${this.baseUrl}product/CPU`);
    }
  }

  signIn(email: string, password: string): Observable<string> {
    return this.http.post(`${this.baseUrl}user/signin`, {email, password}, this.authOptions);
  }
  signOut(): Observable<string> {
    return this.http.post(`${this.baseUrl}user/signout`, {}, this.authOptions);
  }
  signUp(signUp: SignUpRequest): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}user/signup`, signUp);
  }
  accountVerification(accVerf: AccountVerificationRequest): Observable<boolean>{
    return this.http.post<boolean>(`${this.baseUrl}user/accountverification`, accVerf);

  }
}
