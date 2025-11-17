import {BaseProduct} from './BaseProduct';

export interface Cpu extends BaseProduct {
  family: string;
  series: string;
  socket: string;
  supportedChipsets: string;
  recommendedChipset: string;
  architecture: string;
  frequency: string;
  cores: string;
  threads: string;
  unlockedMultiplayer: string;
  cacheMemory: string;
  integratedGpu: string;
  integratedGpuModel: string;
  supportedRam: string;
  lithography: string;
  tdp: string;
  additionalInfo: string;
  includedCooler: string;
}
