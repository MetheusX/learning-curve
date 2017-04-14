import React from 'react';
import CartSummary from '../components/cartSummary'
import SingleListItem from '../components/singleListItem'
import Shop from '../components/shop'
import Cart from '../components/cart'
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
