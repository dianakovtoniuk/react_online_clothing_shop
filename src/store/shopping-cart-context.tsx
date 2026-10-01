import { createContext } from 'react';

import type { CartItem } from '../types';

export type CartContextValue = {
  items: CartItem[];
  addItemToCart: (id: string) => void;
  updateItemQuantity: (productId: string, amount: number) => void;
};

export const CartContext = createContext<CartContextValue>({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});