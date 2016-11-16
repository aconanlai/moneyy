import React from 'react';
import Item from './Item';
import styles from './Item.css';

// ItemWrapper component wraps the two Items
// there are several ways to do CSS in React, since our app is small, we're doing the simplest
// -- add className or id to appropriate items, then add attributes in the css files linked
// from index.html

class ItemWrapper extends React.Component {
  render() {
    const filepath = `img/${this.props.filename}.png`;
    return (
      <div className={styles.itemwrapper}>
        <Item handleClick={this.props.handleClick} {...this.props.item1} />
        <Item handleClick={this.props.handleClick} {...this.props.item2} />
      </div>
    );
  }
}

ItemWrapper.propTypes = {
  filename: React.PropTypes.string,
  handleClick: React.PropTypes.func,
  item1: React.PropTypes.object,
  item2: React.PropTypes.object,
};

module.exports = ItemWrapper;


