import {Component, input} from '@angular/core';
import type {CoolerModel} from '../../../../models/product/CoolerModel';

@Component({
  selector: 'app-cooler-spec-details',
  imports: [],
  templateUrl: './cooler-spec-details.html',
  styleUrl: './cooler-spec-details.css'
})
export class CoolerSpecDetails {
  product = input.required<CoolerModel>();
}
