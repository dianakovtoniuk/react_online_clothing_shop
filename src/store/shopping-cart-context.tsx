import { createContext, useReducer, type ReactNode } from 'react';

import { DUMMY_PRODUCTS } from '../dummy-products';
import type { ShoppingCart } from '../types';

export type CartContextValue = {
  items: ShoppingCart['items'];
  addItemToCart: (id: string) => void;
  updateItemQuantity: (productId: string, amount: number) => void;
};

export const CartContext = createContext<CartContextValue>({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

type AddItemAction = {
  type: 'ADD_ITEM';
  payload: string;
};

type UpdateItemAction = {
  type: 'UPDATE_ITEM';
  payload: {
    productId: string;
    amount: number;
  };
};

type CartAction = AddItemAction | UpdateItemAction;

function shoppingCartReducer(
  state: ShoppingCart,
  action: CartAction
): ShoppingCart {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );

      if (!product) {
        return state;
      }

      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === 'UPDATE_ITEM') {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  return state;
}

type CartContextProviderProps = {
  children: ReactNode;
};

export default function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  function handleAddItemToCart(id: string) {
    shoppingCartDispatch({
      type: 'ADD_ITEM',
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId: string, amount: number) {
    shoppingCartDispatch({
      type: 'UPDATE_ITEM',
      payload: {
        productId,
        amount,
      },
    });
  }

  const ctxValue: CartContextValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}