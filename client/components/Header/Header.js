import React from 'react';
import styles from './Header.css';

class Header extends React.Component {
  render() {
    return (
      <h1 className={styles.header}>Which Costs More?</h1>
    );
  }
}

module.exports = Header;
