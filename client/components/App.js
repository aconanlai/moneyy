import React from 'react';
import ReactDOM from 'react-dom';
import Item from './Item/Item.js';

class App extends React.Component {
  render() {
    return (
      <Item name="dog" imgurl="hottub.png" price="99" description="this is a dog" />
    )
  }
}

export default App;
