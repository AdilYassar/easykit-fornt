/* eslint-disable space-infix-ops */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { persist, createJSONStorage } from 'zustand/middleware';
import { create } from 'zustand';
import { mmkvStorage } from './storage';

interface CartItem {
  _id: string | number;
  item: any;
  count: number;
}

interface CartStore {
  cart: CartItem[];
  addItem: (item: any) => void;
  removeItem: (id: string | number) => void;
  clearCart: () => void;
  getItemCount: (id: string | number) => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      // Add item to cart
      addItem: (item: any) => {
        const currentCart = get().cart;
        const existingItemIndex = currentCart.findIndex(
          (cartItem) => cartItem?._id === item?._id
        );

        if (existingItemIndex >= 0) {
          // Item already exists, increase the count
          const updatedCart = [...currentCart];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            count: updatedCart[existingItemIndex].count + 1,
          };
          set({ cart: updatedCart });
        } else {
          // Item does not exist, add it to the cart
          set({
            cart: [...currentCart, { _id: item._id, item: item, count: 1 }],
          });
        }
      },

      // Clear the entire cart
      clearCart: () => set({ cart: [] }),

      // Remove item from cart or decrease its count
      removeItem: (id: string | number) => {
        const currentCart = get().cart;
        const existingItemIndex = currentCart.findIndex(
          (cartItem) => cartItem?._id === id
        );

        if (existingItemIndex >= 0) {
          const updatedCart = [...currentCart];
          const existingItem = updatedCart[existingItemIndex];

          if (existingItem.count > 1) {
            // Decrease the item count
            updatedCart[existingItemIndex] = {
              ...existingItem,
              count: existingItem?.count - 1,
            };
          } else {
            // Remove the item from the cart
            updatedCart.splice(existingItemIndex, 1);
          }

          set({ cart: updatedCart });
        }
      },

      // Get item count for a specific item
      getItemCount: (id: string | number) => {
        const currentItem = get().cart.find((cartItem) => cartItem._id === id);
        return currentItem ? currentItem.count : 0;
      },

      // Get the total price of the cart
      getTotalPrice: () => {
        return get().cart.reduce(
          (total, cartItem) => total + cartItem.item.price * cartItem.count,
          0
        );
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
