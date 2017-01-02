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
    this.handleName = this.handleName.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleDesc = this.handleDesc.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
      value: selected.value,
      category: selected.category,
      description: selected.description,
      id: selected._id,
      editMode: 'edit',
    });
  }

// switch to 'add new' editing mode, set all state to blank and editMode to 'add'
// so submit button POST instead of PUT
  handleNew() {
    this.setState({
      name: '',
      filename: '',
      value: '',
      category: '',
      description: '',
      id: '',
      editMode: 'add',
    });
  }

// handles the submit button click event, either PUT or POST based on current editMode
  handleSubmit() {
    const payload = {
      name: this.state.name,
      filename: this.state.filename,
      value: this.state.value,
      category: this.state.category,
      description: this.state.description,
    };
    const path = (this.state.editMode === 'add') ? '/items' : `/items/${this.state.id}`;
    const meth = (this.state.editMode === 'add') ? 'post' : 'put';
    const payloadJSON = JSON.stringify(payload);
    fetch(path, {
      method: meth,
      headers: {
        'Content-Type': 'application/json',
      },
      body: payloadJSON,
    }).then((response) => {
      return response.json();
    }).then((json) => {
      console.log(json);
      // we fetch all items again since we've made changes, then call handleNew to switch to 'add new' mode and clear state
      this.fetchAllItems();
      this.handleNew();
    })
    .catch((error) => {
      console.log('Request failed', error);
    });
  }

  // handles the delete button click event
  handleDelete() {
    fetch(`/items/${this.state.id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      return response.json();
    }).then((json) => {
      console.log(json);
      // we fetch all items again since we've made changes, then call handleNew to switch to 'add new' mode and clear state
      this.fetchAllItems();
      this.handleNew();
    })
    .catch((error) => {
      console.log('Request failed', error);
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
    const deleteButton = (this.state.id === '') ? null : <button onClick={this.handleDelete}>delete this</button>
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
        <div><button onClick={this.handleSubmit}>submit this</button></div>
        <div>{deleteButton}</div>
        <div><button onClick={this.handleNew}>add new</button></div>
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
