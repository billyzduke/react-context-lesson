import React, { createContext, useState, useEffect } from 'react'

import { addItemToCart, clearItemFromCart, removeItemFromCart, getCartItemsCount, getCartPriceTotal } from './utils'

export const CartContext = createContext({
  hidden: true,
  toggleCartHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItem: () => {},
  cartItemsCount: 0,
  cartPriceTotal: 0
})

const CartProvider = ({ children }) => {
  const [ hidden, setHidden ] = useState(true)
  const [ cartItems, setCartItems ] = useState([])
  const [ cartItemsCount, setCartItemsCount ] = useState(0)
  const [ cartPriceTotal, setCartPriceTotal ] = useState(0)

  const addItem = item => setCartItems(addItemToCart(cartItems, item))
  const removeItem = item => setCartItems(removeItemFromCart(cartItems, item))
  const clearItem = item => setCartItems(clearItemFromCart(cartItems, item))
  const toggleCartHidden = () => setHidden(!hidden)

  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems))
  }, [cartItems])
  useEffect(() => {
    setCartPriceTotal(getCartPriceTotal(cartItems))
  }, [cartItems])

  return (
    <CartContext.Provider
      value={ {
        hidden,
        toggleCartHidden,
        cartItems,
        addItem,
        removeItem,
        clearItem,
        cartItemsCount,
        cartPriceTotal
      } }
    >{ children }</CartContext.Provider>
  )
}

export default CartProvider
