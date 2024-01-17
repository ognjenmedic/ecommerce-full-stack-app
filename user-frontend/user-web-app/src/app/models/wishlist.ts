import { Product } from './product';

export class Wishlist {
  productId: number;
  sku: string;
  productName: string;
  imageUrl: string;
  description: string;
  unitPrice: number;

  constructor(product: Product) {
    this.productId = product.productId;
    this.sku = product.sku;
    this.productName = product.productName;
    this.imageUrl = product.imageUrl;
    this.description = product.description;
    this.unitPrice = product.unitPrice;
  }
}
