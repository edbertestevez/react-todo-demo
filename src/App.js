import React from 'react';
import './App.css';
import ToDoList from './components/ToDoList';
import AddForm from './components/AddForm';
import axios from 'axios';

class ToDoApp extends React.Component {

  state = {
    todos: [],
    item: '',
    editId: '',
    editItem: '',
    isFetching: true,
    searchTodo: ''
  }


  componentDidMount() {
    this.retrieveTodos();
  }

  retrieveTodos() {
    axios.get('http://testreacttodoapp.herokuapp.com/todos')
      .then(response => this.setState({ todos: response.data, isFetching: false }));
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://testreacttodoapp.herokuapp.com/todos', { title: this.state.item })
      .then(() => {
        this.retrieveTodos();
        this.setState({ item: '' });
      });
  }

  handleUpdate = () => {
    axios.put(`http://testreacttodoapp.herokuapp.com/todos/${this.state.editId}`, { title: this.state.editItem })
      .then(() => {
        this.retrieveTodos();
        this.setState({ editId: '', editItem: '' });
      });
  }

  removeItem = (itemId) => {
    axios.delete(`http://testreacttodoapp.herokuapp.com/todos/${itemId}`)
      .then(() => {
        this.retrieveTodos();
        this.setState({ editId: '', editItem: '' });
      });
  }

  renderEdit = (todo) => {
    this.setState({ editId: todo.id, editItem: todo.title });
  }

  cancelUpdate = () => {
    this.setState({ editId: '', editItem: '' });
  }

  render() {
    return (
      <div className="App">
        <h1>React Todo List</h1>
        <AddForm
          {...this.state}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
        />
        <div className="separator" />
        <br />

        <div style={{ width: '100%' }} className="search" >
          Search: {' '}
          <input type="text" name="searchTodo" placeholder="Search to do. . ." onChange={this.handleInputChange} />
        </div>

        {this.state.isFetching ? (
          <p>Fetching todo list . . .</p>
        ) : (
            <ToDoList
              {...this.state}
              removeItem={this.removeItem}
              renderEdit={this.renderEdit}
              handleInputChange={this.handleInputChange}
              handleUpdate={this.handleUpdate}
              cancelUpdate={this.cancelUpdate}
            />
          )}

      </div>
    );
  }
}

export default ToDoApp;
