import React from 'react';
import ReactDOM from 'react-dom';

// Item component presents a single Item
// the const filepath is ES6 template literal for constructing our image filepath string
// note that in JSX, adding a class is className, not class
//
// there are several ways to do CSS in React, since our app is small, we're doing the simplest
// -- add className or id to appropriate items, then add attributes in the css files linked
// from index.html

class Item extends React.Component {
  render() {
    const filepath = `img/${this.props.filename}.png`;
    return (
      <div className="col-md-6">
        <div className="panel panel-default">
          <div className="panel-heading">
            {this.props.name}
          </div>
          <div className="panel-body">
            <img alt={this.props.imgurl} src={filepath} /><br />
            <span className="price">${this.props.value}</span><br />
            {this.props.description}
          </div>
        </div>
      </div>
    );
  }
}

export default Item;


