import {create} from 'zustand'
import { persist } from 'zustand/middleware'

// shopping cart using zustand state management 

type CartItem = {
  name: string,
  id: string,
  images?: string[],
  description?: string,
  unit_amount: number,
  quantity: number
}


type CartState = {
  isOpen: boolean
  cart: CartItem[]
  toggleCart: () => void
  addProduct: (item: CartItem) => void
}

export const useCartStore = create<CartState>() (
  // telling zustand the data we want to have. Using the persist and set functions
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      // modify isOpen to be opposite of what it is. Toggles true and false
      toggleCart: () => set((state) => ({isOpen: !state.isOpen})),
      addProduct: (item) => set((state) => {
        // finding if the item exists in the cart already. Because if item already exists we just want to add to it not replace
        const existingItem = state.cart.find(cartItem => cartItem.id === item.id )
        if (existingItem) {
          const updatedCart = state.cart.map((cartItem) => {
            if(cartItem.id === item.id){
              return {...cartItem, quantity: cartItem.quantity +1}
            }
            return cartItem
          })
          return {cart: updatedCart}
        } else{
          // keep cart as it was and add an item with a quantity of 1 to it
          return { cart: [...state.cart, {...item, quantity: 1 }] }
        }
      }),
    }),
    // custom name of the data
    { name: "cart-store" }
  )
)
