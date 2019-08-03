import React from 'react';
import './App.css';
import ToDoList from './components/ToDoList';
import AddForm from './components/AddForm';
import axios from 'axios';
import LoginForm from './components/LoginForm';

class ToDoApp extends React.Component {
 
  constructor(props){
    super();
    this.state = {
      todos: [],
      item: '',
      editId: '',
      editItem: '',
      isFetching: true,
      searchTodo: '',
      isLoggedIn: localStorage.getItem('isTodoLoggedIn') 
    }
  }


  componentDidMount() {
    this.retrieveTodos();
  }

  handleLogin = (identifier, password) => {
    axios.post("http://testreacttodoapp.herokuapp.com/auth/local", { identifier, password })
      .then(() => {
        this.setState({ isLoggedIn: true, loginError: '' });
        localStorage.setItem('isTodoLoggedIn', true);
      })
      .catch(err => this.setState({ isLoggedIn: false, loginError: 'Incorrect username/password' }))
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

  logout = () => {
    this.setState({ isLoggedIn: false })
    localStorage.setItem('isTodoLoggedIn', false);
  }

  render() {

    if (this.state.isLoggedIn) {
      return (
        <LoginForm handleLogin={this.handleLogin} loginError={this.state.loginError} />
      )
    } else {
      return (
        <div className="App">
          <div style={{ width: '100%' }}>
            <button className="btn-logout" onClick={this.logout}>Logout</button>
          </div>

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
}

export default ToDoApp;
