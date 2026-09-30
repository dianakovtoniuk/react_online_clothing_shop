export type ProductData = {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type ShoppingCart = {
  items: CartItem[];
};