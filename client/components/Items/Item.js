import React from 'react';
import styles from './Item.css';

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
      <div className={styles.item}>
        <div>
          <div>
            {this.props.name}
          </div>
          <div>
            <img onClick={() => this.props.handleClick()} className={styles.pic} alt={this.props.imgurl} src={filepath} /><br />
            <span>${this.props.value}</span><br />
            {this.props.description}
          </div>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  description: React.PropTypes.string,
  handleClick: React.PropTypes.func,
  imgurl: React.PropTypes.string,
  name: React.PropTypes.string,
  value: React.PropTypes.string,
  filename: React.PropTypes.string,
};

export default Item;
