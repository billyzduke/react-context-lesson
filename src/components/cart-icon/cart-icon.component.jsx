import React, { useContext } from 'react'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import './cart-icon.styles.scss'

import { CartContext } from '../../providers/cart/provider'

const CartIcon = () => {
  const { toggleCartHidden, cartItemsCount } = useContext(CartContext)
  return (
    <div
      className='cart-icon'
      onClick={ toggleCartHidden }
    >
      <ShoppingIcon
        className='shopping-icon'
      />
      <span
        className='item-count'
      >{ cartItemsCount }</span>
    </div>
  )
}

export default CartIcon
