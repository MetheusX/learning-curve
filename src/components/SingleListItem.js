import React, { Component } from 'react';
import { connect } from 'react-redux'
import { requestItemData } from '../ducks/listDucks'
import {
  loadingSelector,
  selectedItemsSelector,
  getItemByURLParamSelector
} from '../selectors/shopSelector';

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
          <div>
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
          </div>
        </div>
      )
    }
  }
}

//what keys should be taken from the state for this component
const mapStateToProps = (state, ownProps) => ({
  itemsInCart : selectedItemsSelector(state),
  item : getItemByURLParamSelector(state, ownProps),
  isLoading : loadingSelector(state)
});

//action creators mapped to props
const mapDispatchToProps = dispatch => ({
  fetchItem : itemId => dispatch(requestItemData(itemId))
});

//association between action creators and state
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleItem)
