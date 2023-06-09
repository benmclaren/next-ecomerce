'use client'
// once order is confirmed we are done wth payment intent
import { motion } from "framer-motion"
import Image from "next/image"
import giphy from '@/public/giphy.gif'
import Link from "next/link"
import { useCartStore } from "@/store"
import { useEffect } from "react"

export default function OrderConfirmed(){
  const cartStore = useCartStore()

  useEffect(() => {
    cartStore.setPaymentIntent("")
    cartStore.clearCart()
  }, [])

  const checkoutOrder = () => {
    setTimeout(() => {
      cartStore.setCheckout('cart')
    }, 1000);
    cartStore.toggleCart()
  }

  return(
    <motion.div
      className="flex items-center justify-center my-12"
      initial={{scale: 0.5, opacity: 1}}
      animate={{scale: 1, opacity:1}}
    >
      <div className="p-12 rounded-md text-center">
        <h1 className="text-2xl font-medium">Your order has been placed 🚀</h1>
        <h2 className="text=sm my-4">Check your email for confirmation</h2>
        <Image src={giphy} alt="regular show gif" className="py-8"/>
        <div className="flex items-center justify-center gap-12">
          <Link href={"/dashboard"}>
            <button 
              onClick={checkoutOrder}
              className="font-medium"
            >
              Check your order
            </button>
          </Link>
        </div>
      </div>
    </motion.div> 
  )
}
