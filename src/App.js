import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import './App.css'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component'

import Header from './components/header/header.component'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'

import UserContext from './contexts/user/context'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      user: null
    }
  }
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          this.setState({
            user: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        })
      }

      this.setState({ user: userAuth })
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <UserContext.Provider
          value={ this.state.user }
        >
          <Header />
        </UserContext.Provider>
        <Switch>
          <Route
            exact
            path='/'
            component={ HomePage }
          />
          <Route
            path='/shop'
            component={ ShopPage }
          />
          <Route
            exact
            path='/checkout'
            component={ CheckoutPage }
          />
          <Route
            exact
            path='/signin'
            render={ () =>
              this.state.user ? (
                <Redirect
                  to='/'
                />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    )
  }
}

export default App
