import React from 'react';
import CartSummary from '../Components/cartSummary'
import SingleListItem from '../Components/singleListItem'
import Shop from '../Components/shop'
import Cart from '../Components/cart'
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
