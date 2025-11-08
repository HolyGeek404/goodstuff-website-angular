export interface CpuProduct {
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
  name: string;
  team: string;
  price: string;
  productImg: string;
  category: string;
  id: string;
  productId: string;
  warranty: string;
  producerCode: string | null;
}
