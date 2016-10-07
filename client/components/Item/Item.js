import React from 'react';
import ReactDOM from 'react-dom';

class Item extends React.Component {
  render() {
    const filepath = `img/${this.props.imgurl}`;
    return (
      <div className="col-md-6">
        <div className="panel panel-default">
          <div className="panel-heading">
            {this.props.name}
          </div>
          <div className="panel-body">
            <img alt={this.props.imgurl} src={filepath} /><br />
            <span className="price">${this.props.price}</span><br />
            {this.props.description}
          </div>
        </div>
      </div>
    );
  }
}

export default Item;


