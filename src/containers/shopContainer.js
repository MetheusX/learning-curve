import React from 'react';
import CartSummary from '../components/CartSummary'
import SingleListItem from '../components/SingleListItem'
import Shop from '../components/Shop'
import Cart from '../components/Cart'
import { Route } from 'react-router-dom'


const ShopContainer = ({match}) => {
  return (
    <div>
      <CartSummary/>
      <Route exact path="/shop" component={Shop}/>
      <Route path="/shop/:itemId(\d+)" component={SingleListItem}/>
      <Route path="/shop/cart" component={Cart}/>
    </div>
  )
}

export default ShopContainer;
