import React from 'react';
import ReactDOM from 'react-dom';
import Item from './Item/Item.js';

class App extends React.Component {
// constructor sets initial state
  constructor(props) {
    super(props);
    this.state = {
      item1: {},
      item2: {},
    };
  }
// componentDidmount fires right after component mounts onto DOM
// see React component lifecycle documentation
//
// here we use fetch API to get two random items, see our server.js
// to see how we create endpoint
//
// the return is an array with two items, set our state objects to be these

  componentDidMount() {
    fetch('/items').then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({ item1: json[0], item2: json[1] });
    });
  }

// our render function passes our state as props into the children
// the ... notation is ES6+ spread notation, basically says everything in item1
// is passed to the Item component as individual props

  render() {
    const item1 = this.state.item1;
    const item2 = this.state.item2;
    return (
      <div className="row">
        <h1>Which Costs More?</h1>
        <Item {...item1} />
        <Item {...item2} />
      </div>
    )
  }
}

export default App;
