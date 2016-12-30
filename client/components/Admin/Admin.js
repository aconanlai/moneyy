import React from 'react';
import ImageUploader from './ImageUploader';

class Admin extends React.Component {
// constructor sets initial state
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      name: '',
      filename: '',
      value: '',
      category: '',
      description: '',
      id: '',
      editMode: 'add',
    };
    this.fetchAllItems = this.fetchAllItems.bind(this);
    this.handleNewImage = this.handleNewImage.bind(this);
    this.handleItemSelect = this.handleItemSelect.bind(this);
    this.handleName = this.handleNewImage.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleDesc = this.handleDesc.bind(this);
  }

// componentDidMount fires right after component mounts onto DOM
// see React component lifecycle documentation

// load items when component is mounted
  componentDidMount() {
    this.fetchAllItems();
  }

// fetch from our api endpoint
  fetchAllItems() {
    fetch('/allitems').then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({ items: json });
    });
  }

  handleItemSelect(event) {
    const selected = this.state.items[event.target.value];
    this.setState({
      name: selected.name,
      filename: selected.filename,
      value: selected.filename,
      category: selected.category,
      description: selected.description,
      id: selected._id,
    });
  }

  handleName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleCategory(event) {
    this.setState({
      category: event.target.value,
    });
  }

  handleValue(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleDesc(event) {
    this.setState({
      description: event.target.value,
    });
  }

  handleNewImage(url) {
    this.setState({ filename: url });
  }

// our render function passes our state as props into the children

  render() {
    return (
      <div>
        select item: 
        <select value={this.state.selectedItem} onChange={this.handleItemSelect}>
            {this.state.items.map((item, i) => {
              return (
                <option key={i} value={i}>{item.name}</option>
              );
            })}
          </select>

          <div>name: <input value={this.state.name} onChange={this.handleName} /></div>
        <div>value: <input value={this.state.value} onChange={this.handleValue} /></div>
        <div>description: <textarea rows="10" cols="45" value={this.state.description} onChange={this.handleDesc} /></div>
        <div>category: <input value={this.state.category} onChange={this.handleCategory} /></div>
       <div>
          image: {this.state.filename}<br /><img alt={'image'} src={this.state.filename} /><br />
          <ImageUploader handleNewImage={this.handleNewImage} />
      </div>
      </div>
    );
  }
}

export default Admin;
