export interface AddCartCommand {
  userId: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
}
