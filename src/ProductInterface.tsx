export interface Purchase {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface PurchaseProductComponentProps {
  purchases: Purchase[];
  setPurchases: React.Dispatch<React.SetStateAction<Purchase[]>>;
}
