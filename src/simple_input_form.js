import React from 'react'

export default class SimpleInput extends React.Component {
  state = {
    textOutput : ''
  }
  onChangeHandler = (e) => {
    this.setState({
      inputValue : e.target.value
    });
  }
  // onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     textOutput : e.target.inputOne.value
  //   });
  // }
  render(){
    return (
      <div>
        <form>
          <input type="text" name="inputOne" value={this.state.inputValue} onChange={this.onChangeHandler}/>
          {/* <button type="submit">Submit</button> */}
        </form>
        <div>
          <span>{this.state.inputValue}</span>
        </div>
      </div>
    )
  }
}
