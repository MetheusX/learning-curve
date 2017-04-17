import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  numOfItemsInCarSelector,
  totalPriceOfCartSelector
} from '../selectors/shopSelector';

const SVG_URL = 'https://image.flaticon.com/icons/svg/2/2772.svg';
const SVGWrapper = styled.div`
  position: relative;
  &::before {
    content : '${props => props.numOfItems}';
    position: absolute;
    border-radius: 50%;
    background-color: red;
    width: 18px;
    height: 18px;
    text-align: center;
    color: white;
    font-size: 14px;
  }
`;

const StyledSVG = styled.svg`
  background-image: url(${SVG_URL});
  width : 40px;
  height : 40px;
`;

class CartSummary extends Component {
  render() {
    return (
      <div>
        <SVGWrapper numOfItems={this.props.totalNumOfItems}>
          <StyledSVG/>
          <Link to="/shop/cart">Cart</Link>
          <span>{`$${this.props.totalPrice}`}</span>
        </SVGWrapper>
      </div>
    );
  }
}

//what keys should be taken from the state for this component
const mapStateToProps = (state) => ({
  totalPrice : totalPriceOfCartSelector(state),
  totalNumOfItems : numOfItemsInCarSelector(state),
});

//association between action creators and state
CartSummary = connect(
  mapStateToProps,
  {}
)(CartSummary)

export default CartSummary
