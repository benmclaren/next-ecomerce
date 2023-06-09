'use client'

import Image from "next/image"
import { useCartStore } from "@/store"
import formatPrice from "@/util/PriceFormat"
import {IoAddCircle, IoRemoveCircle} from 'react-icons/io5'
import emptyCart from '@/public/emptyCart.png'
import { motion, AnimatePresence } from 'framer-motion'
import Checkout from "./Checkout"
import OrderConfirmed from "./OrderConfirmed"

// The physical cart UI
export default function Cart() {
  const cartStore = useCartStore()
  // console.log(cartStore.isOpen)
  // console.log(cartStore)

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount * item.quantity
    console.log(item)
  }, 0)
  // 0 is starting value

  return (
    <motion.div
      initial={{ opacity:0 }}
      animate={{ opacity:1 }}
      exit={{ opacity:0 }}
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      {/* stopPropgation stops the click event from above */}
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()} 
        className="bg-base-300 absolute right-0 top-0 h-screen p-12 overflow-y-scroll text-gray-70 w-full lg:w-2/5"
      >
        {cartStore.onCheckout === "cart" && (
          <button 
            className="text-sm font-bold pb-12"
            onClick={() => cartStore.toggleCart()}
          >
            Back to store 🏃‍♀️
          </button>
        )}
        {cartStore.onCheckout === "checkout" && (
          <button 
            className="text-sm font-bold pb-12"
            onClick={() => cartStore.setCheckout('cart')}
          >
            Check your cart 🛒
          </button>
        )}
        {/* cart items */}
        { cartStore.onCheckout === 'cart' && (
        <>
          {cartStore.cart.map((item) => (
            <motion.div layout key={item.id} className="flex p-4 gap-4 bg-base-100 my-4">
              <Image
                className="rounded-md h-24 w-24" 
                src={item.image} 
                alt={item.name} 
                width={120} 
                height={120}
              />
              <div>
                <h2>{item.name}</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={() => 
                      cartStore.removeProduct({
                        id: item.id, 
                        image: item.image, 
                        name: item.name, 
                        unit_amount: item.unit_amount, 
                        quantity: item.quantity
                      })
                    }
                  >
                    <IoRemoveCircle />
                  </button>
                  <h2>{item.quantity}</h2>
                  <button 
                    onClick={() => 
                      cartStore.addProduct({
                        id: item.id, 
                        image: item.image, 
                        name: item.name, 
                        unit_amount: item.unit_amount, 
                        quantity: item.quantity
                      })
                    }
                  >
                    <IoAddCircle />
                  </button>
                </div>
                <p className="text-sm">{item.unit_amount && formatPrice(item.unit_amount)}</p>
              </div>
            </motion.div>
          ))}
          </>
        )}
        {/* checkout and total */}
        {cartStore.cart.length > 0 && cartStore.onCheckout === "cart" ? (
          <motion.div layout>
            {cartStore.cart.length >= 1 && (
              <p>Total: {formatPrice(totalPrice)}</p>
            )} 
            <button 
              onClick={() => cartStore.setCheckout("checkout")} 
              className="py-2 mt-4 bg-teal-700 w-full rounded-md text-white"
            >
              Checkout 
            </button>
          </motion.div>
        ) : null}
        { cartStore.onCheckout === 'checkout' && <Checkout /> }
        { cartStore.onCheckout === 'success' && <OrderConfirmed /> }
        <AnimatePresence>
          {!cartStore.cart.length && cartStore.onCheckout === 'cart' && (
            <motion.div 
              animate={{scale: 1, rotateZ: 0, opacity: 0.75}}
              initial={{scale: 0.5, rotateZ: -10, opacity: 0 }}
              exit={{scale: 1, rotateZ: 0, opacity: 0.75}}
              className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75"
            >
              <h1>Shopping cart is empty...😢</h1>
              <Image src={emptyCart} alt='image of empty shopping cart' width={200} height={200}/>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
    </motion.div>
  )
}
