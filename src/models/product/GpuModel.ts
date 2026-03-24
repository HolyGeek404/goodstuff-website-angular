import {BaseProduct} from './BaseProduct';

export interface GpuModel extends BaseProduct {
  gpuProcessorLine?: string;
  pcieType?: string;
  memorySize?: string;
  memoryType?: string;
  memoryBus?: string;
  memoryRatio?: string;
  coreRatio?: string;
  coresNumber?: string;
  coolingType?: string;
  outputsType?: string;
  supportedLibraries?: string;
  powerConnector?: string;
  recommendedPsuPower?: string;
  length?: string;
  width?: string;
  height?: string;
  gpuProcessorName?: string;
  manufacturer?: string;
}
