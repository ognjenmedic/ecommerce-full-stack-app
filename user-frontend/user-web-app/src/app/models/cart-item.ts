export class CartItem {
  productId: number;
  quantity: number;
  productName: string;
  imageUrl: string;
  description: string;
  unitPrice: number;

  constructor(
    productId: number,
    productName: string,
    imageUrl: string,
    description: string,
    unitPrice: number,
    quantity: number = 1
  ) {
    this.productId = productId;
    this.productName = productName;
    this.imageUrl = imageUrl;
    this.description = description;
    this.unitPrice = unitPrice;
    this.quantity = quantity;
  }

  // getTotalPrice(): number {
  //   return this.unitPrice * this.quantity;
  // }
}
