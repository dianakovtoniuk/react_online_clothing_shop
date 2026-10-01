import { createContext } from 'react';

import type { ShoppingCart } from '../types';

export const CartContext = createContext<ShoppingCart>({
  items: [],
});