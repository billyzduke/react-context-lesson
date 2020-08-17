import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { auth } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import { selectCartHidden } from '../../redux/cart/cart.selectors'

import { ReactComponent as Logo } from '../../assets/crown.svg'

import './header.styles.scss'

import UserContext from '../../contexts/user/context'
import CartContext from '../../contexts/cart/context'

const Header = () => {
  const user = useContext(UserContext)
  const [ hidden, setHidden ] = useState(true)
  const toggleCartHidden = () => setHidden(!hidden)
  return (
    <div
      className='header'
    >
      <Link
        className='logo-container'
        to='/'
      >
        <Logo
          className='logo'
        />
      </Link>
      <div
        className='options'
      >
        <Link
          className='option'
          to='/shop'
        >
        SHOP
        </Link>
        <Link
          className='option'
          to='/shop'
        >
        CONTACT
        </Link>
        { user ? (
          <div
            className='option'
            onClick={ () => auth.signOut() }
          >
          SIGN OUT
          </div>
        ) : (
          <Link
            className='option'
            to='/signin'
          >
          SIGN IN
          </Link>
        ) }
        <CartContext.Provider
          value={ { hidden, toggleCartHidden } }
        >
          <CartIcon />
        </CartContext.Provider>
      </div>
      { hidden ? null : <CartDropdown /> }
    </div>
  )}

const mapStateToProps = createStructuredSelector({
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)
