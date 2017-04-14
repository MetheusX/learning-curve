import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchItemData } from '../Ducks/listDucks'
import styled from 'styled-components'


const StyledCard = styled.div`

`

class SingleItem extends Component{
  componentDidMount() {
    //fetch item from server if not loaded
    if(!this.props.item){
      this.props.fetchItem(this.props.match.params.itemId) //api call
    }
  }
  render() {
    if(this.props.isLoading){
      return (
        <div>
          <span>
            Loading...
          </span>
        </div>
      )
    }else{
      return (
        <div>
          <StyledCard>
            <div>{this.props.item.name}</div>
            <div>{this.props.item.price}</div>
            <div>
              In Cart?
              {(this.props.itemsInCart[this.props.item.id])
                ?
                " Yes"
                :
                " No"}
            </div>
          </StyledCard>
        </div>
      )
    }
  }
}

//what keys should be taken from the state for this component
const mapStateToProps = (state, ownProps) => ({
  itemsInCart : state.cardList.itemsInCart,
  // items : state.cardList.items,
  item : state.cardList.items.find((item) => {
    return ownProps.match.params.itemId === item.id
  }),
  isLoading : state.cardList.isLoading
});

//action creators mapped to props
const mapDispatchToProps = (dispatch) => ({
  fetchItem : itemId => dispatch(fetchItemData(itemId)),
  // removeItemFromCart : itemId => dispatch(removeItemFromCart(itemId))
});

//association between action creators and state
const SingleListItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleItem)

export default SingleListItem
