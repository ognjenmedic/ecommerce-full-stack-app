import { Product } from './product';

export class CartItem {
  quantity: number;
  product: Product = {
    sku: 0,
    productName: '',
    imageUrl: '',
    description: '',
    unitPrice: 0,
    category: '',
    categoryId: 0,
    unitsInStock: 0,
  };

  constructor(product: Product) {
    this.product.sku = product.sku;
    this.product.productName = product.productName;
    this.product.imageUrl = product.imageUrl;
    this.product.description = product.description;
    this.product.unitPrice = product.unitPrice;
    this.quantity = 1;
  }
}
