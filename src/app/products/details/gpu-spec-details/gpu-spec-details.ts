import {Component, input} from '@angular/core';
import {GpuModel} from '../../../../models/product/GpuModel';

@Component({
  selector: 'app-gpu-spec-details',
  imports: [],
  templateUrl: './gpu-spec-details.html',
  styleUrl: './gpu-spec-details.css'
})
export class GpuSpecDetails {
  product = input.required<GpuModel>();

}
