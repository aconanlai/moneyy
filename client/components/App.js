import React from 'react';
import ReactDOM from 'react-dom';
import Item from './Item/Item.js';

class App extends React.Component {
  render() {
    return (
      <div className="row">
        <h1>Which Costs More?</h1>
        <Item name="dog" imgurl="hottub.png" price="99" description="this is a dog" />
        <Item name="dog" imgurl="hottub.png" price="99" description="this is a dog" />
      </div>
    )
  }
}

export default App;
