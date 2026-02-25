import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { GoodStuffFunctionsService } from '../../../services/GoodStuffFunctionsService';
import { ProductTypes } from '../../../models/product/ProductTypes';
import type { BaseProduct } from '../../../models/product/BaseProduct';
import type { Cpu } from '../../../models/product/Cpu';
import type { Gpu } from '../../../models/product/Gpu';
import type { Cooler } from '../../../models/product/Cooler';
import { UserSessionService } from '../../../services/UserSessionService';
import type { AddCartCommand } from '../../../models/cart/AddCartCommand';

type SpecItem = {
  label: string;
  value: string | undefined | null;
};

type SpecGroup = {
  title: string;
  items: SpecItem[];
};

type HeroStat = {
  label: string;
  value: string | undefined | null;
};

type ToastType = 'success' | 'error';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './single-product.html',
  styleUrl: './single-product.css'
})
export class SingleProduct {
  private functionsService = inject(GoodStuffFunctionsService);
  private userSession = inject(UserSessionService);

  category = signal<ProductTypes>(ProductTypes.CPU);
  product = signal<BaseProduct | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  productId = signal<string>('');
  isAddingToCart = signal<boolean>(false);
  toastMessage = signal<string | null>(null);
  toastType = signal<ToastType>('success');
  protected readonly ProductTypes = ProductTypes;
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  heroStats = computed<HeroStat[]>(() => {
    const current = this.product();
    if (!current) {
      return [];
    }
    switch (this.category()) {
      case ProductTypes.CPU: {
        const cpu = current as Cpu;
        return [
          { label: 'Cores', value: cpu.cores },
          { label: 'Frequency', value: cpu.frequency },
          { label: 'TDP', value: cpu.tdp }
        ];
      }
      case ProductTypes.GPU: {
        const gpu = current as Gpu;
        return [
          { label: 'Memory', value: gpu.memorySize },
          { label: 'Cores', value: gpu.coresNumber },
          { label: 'PSU', value: gpu.recommendedPsuPower }
        ];
      }
      case ProductTypes.COOLER: {
        const cooler = current as Cooler;
        return [
          { label: 'Fans', value: cooler.fans },
          { label: 'Heat Pipes', value: cooler.heatPipes },
          { label: 'Height', value: cooler.height }
        ];
      }
      default:
        return [];
    }
  });

  specGroups = computed<SpecGroup[]>(() => {
    const current = this.product();
    if (!current) {
      return [];
    }
    switch (this.category()) {
      case ProductTypes.CPU: {
        const cpu = current as Cpu;
        return [
          {
            title: 'Core Specs',
            items: [
              { label: 'Architecture', value: cpu.architecture },
              { label: 'Cores', value: cpu.cores },
              { label: 'Threads', value: cpu.threads },
              { label: 'Frequency', value: cpu.frequency },
              { label: 'Cache', value: cpu.cacheMemory }
            ]
          },
          {
            title: 'Platform',
            items: [
              { label: 'Socket', value: cpu.socket },
              { label: 'Supported Chipsets', value: cpu.supportedChipsets },
              { label: 'Recommended Chipset', value: cpu.recommendedChipset },
              { label: 'Supported RAM', value: cpu.supportedRam }
            ]
          },
          {
            title: 'Build & Extras',
            items: [
              { label: 'Lithography', value: cpu.lithography },
              { label: 'TDP', value: cpu.tdp },
              { label: 'Unlocked Multiplier', value: cpu.unlockedMultiplayer },
              { label: 'Integrated GPU', value: cpu.integratedGpu },
              { label: 'GPU Model', value: cpu.integratedGpuModel },
              { label: 'Included Cooler', value: cpu.includedCooler },
              { label: 'Additional Info', value: cpu.additionalInfo }
            ]
          }
        ];
      }
      case ProductTypes.GPU: {
        const gpu = current as Gpu;
        return [
          {
            title: 'Graphics Engine',
            items: [
              { label: 'Processor Line', value: gpu.gpuProcessorLine },
              { label: 'Processor Name', value: gpu.gpuProcessorName },
              { label: 'Manufacturer', value: gpu.manufacturer },
              { label: 'Cores', value: gpu.coresNumber }
            ]
          },
          {
            title: 'Memory',
            items: [
              { label: 'Size', value: gpu.memorySize },
              { label: 'Type', value: gpu.memoryType },
              { label: 'Bus', value: gpu.memoryBus },
              { label: 'Memory Ratio', value: gpu.memoryRatio },
              { label: 'Core Ratio', value: gpu.coreRatio }
            ]
          },
          {
            title: 'Board & Power',
            items: [
              { label: 'PCIe', value: gpu.pcieType },
              { label: 'Cooling Type', value: gpu.coolingType },
              { label: 'Outputs', value: gpu.outputsType },
              { label: 'Power Connector', value: gpu.powerConnector },
              { label: 'Recommended PSU', value: gpu.recommendedPsuPower }
            ]
          },
          {
            title: 'Dimensions',
            items: [
              { label: 'Length', value: gpu.length },
              { label: 'Width', value: gpu.width },
              { label: 'Height', value: gpu.height }
            ]
          }
        ];
      }
      case ProductTypes.COOLER: {
        const cooler = current as Cooler;
        return [
          {
            title: 'Cooling Setup',
            items: [
              { label: 'Type', value: cooler.coolerType },
              { label: 'Fans', value: cooler.fans },
              { label: 'Fan Size', value: cooler.fanSize },
              { label: 'RPM Control', value: cooler.rpmControl },
              { label: 'Bearing Type', value: cooler.bearingType }
            ]
          },
          {
            title: 'Compatibility',
            items: [
              { label: 'Compatibility', value: cooler.compatibility },
              { label: 'Connector', value: cooler.connector },
              { label: 'Heat Pipes', value: cooler.heatPipes }
            ]
          },
          {
            title: 'Electrical',
            items: [
              { label: 'Supply Voltage', value: cooler.supplyVoltage },
              { label: 'Supply Current', value: cooler.supplyCurrent },
              { label: 'MTBF Lifetime', value: cooler.mtbfLifetime }
            ]
          },
          {
            title: 'Dimensions',
            items: [
              { label: 'Height', value: cooler.height },
              { label: 'Width', value: cooler.width },
              { label: 'Depth', value: cooler.depth },
              { label: 'Weight', value: cooler.weight }
            ]
          },
          {
            title: 'Extras',
            items: [
              { label: 'Highlight', value: cooler.highlight },
              { label: 'Manufacturer', value: cooler.manufacture }
            ]
          }
        ];
      }
      default:
        return [];
    }
  });

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      const cat = params.get('category') as keyof typeof ProductTypes | null;
      const productCategory = cat && ProductTypes[cat] ? ProductTypes[cat] : ProductTypes.CPU;
      const productId = params.get('id') ?? '';
      this.category.set(productCategory);
      this.productId.set(productId);
      this.loading.set(true);
      this.error.set(null);

      this.functionsService.getProducts(productCategory).subscribe({
        next: (data) => {
          const match = data.find(item => item.productId === productId || item.id === productId);
          if (!match) {
            this.product.set(null);
            this.error.set('Product not found.');
          } else {
            this.product.set(match);
          }
          this.loading.set(false);
        },
        error: () => {
          this.product.set(null);
          this.error.set('Unable to load this product right now.');
          this.loading.set(false);
        }
      });
    });
  }

  formatValue(value: string | undefined | null): string {
    if (!value || value.trim().length === 0) {
      return '—';
    }
    return value;
  }

  formatPrice(value: string | undefined | null): string {
    const formatted = this.formatValue(value);
    return formatted === '—' ? formatted : `${formatted} zł`;
  }

  addToCart(): void {
    const currentProduct = this.product();
    const currentUser = this.userSession.getUser();

    if (!currentProduct || !currentUser?.email) {
      this.showToast('Please sign in to add products to your cart.', 'error');
      return;
    }

    const parsedPrice = Number.parseInt(currentProduct.price, 10);
    if (Number.isNaN(parsedPrice)) {
      this.showToast('Unable to add this product right now. Invalid price format.', 'error');
      return;
    }

    const command: AddCartCommand = {
      userId: currentUser.email,
      productId: currentProduct.productId || currentProduct.id,
      name: currentProduct.name,
      quantity: 1,
      price: parsedPrice
    };

    this.isAddingToCart.set(true);
    this.functionsService.addToCart(command).subscribe({
      next: () => {
        this.showToast('Product successfully added to your cart.', 'success');
        this.isAddingToCart.set(false);
      },
      error: () => {
        this.showToast('Failed to add product to cart. Please try again.', 'error');
        this.isAddingToCart.set(false);
      }
    });
  }

  dismissToast(): void {
    this.toastMessage.set(null);
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
      this.toastTimer = null;
    }
  }

  private showToast(message: string, type: ToastType): void {
    this.toastType.set(type);
    this.toastMessage.set(message);

    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toastTimer = setTimeout(() => {
      this.toastMessage.set(null);
      this.toastTimer = null;
    }, 3200);
  }
}
