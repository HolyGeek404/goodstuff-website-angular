import {BaseProduct} from './BaseProduct';

export interface Cooler extends BaseProduct {
  coolerType?: string;
  compatibility?: string;
  size?: string;
  heatPipes?: string;
  fans?: string;
  rpmControl?: string;
  rmp?: string;
  bearingType?: string;
  fanSize?: string;
  connector?: string;
  supplyVoltage?: string;
  supplyCurrent?: string;
  highlight?: string;
  mtbfLifetime?: string;
  height?: string;
  width?: string;
  depth?: string;
  weight?: string;
  manufacture?: string;
}
