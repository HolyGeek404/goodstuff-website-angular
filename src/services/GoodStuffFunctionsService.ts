import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CpuProduct} from '../models/product/CpuModel';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GoodStuffFunctionsService {
  private apiUrl = 'http://localhost:7257/api/HelloWorld'; // Azure Function

  constructor(private http: HttpClient) {}

  getCpus(): Observable<CpuProduct[]> {
    return this.http.get<CpuProduct[]>(this.apiUrl);
  }
}
