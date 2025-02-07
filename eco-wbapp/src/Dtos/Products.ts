export class ShopProductDto {
  name: string | undefined;
  category: string | undefined;
  subcategory: string | undefined;
  condition: string | undefined;
  style: string | undefined;
  description: string | undefined;
  userId: string | undefined;
  price: number | undefined;
  adress: string | undefined;
  base64Images: string[] | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  transactionType: string | undefined;
}

export class CreateProductDto {
  name: string | undefined;
  description: string | undefined;
  price: number | undefined;
  condition: string | undefined;
  category: string | undefined;
  subcategory: string | undefined;
  status: string | undefined;
  style?: string;
  transactionType: string | undefined;
  adress:
    | {
        street: string;
        city: string;
        zip: string;
      }
    | undefined;
  images: File[] | undefined;
}
