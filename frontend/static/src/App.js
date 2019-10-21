import React, {Component} from 'react';
import axios from 'axios'
import './App.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  removeTodo(todo) {
    let todos = [...this.state.todos];
    let index = todos.indexOf(todo);
    todos.splice(index, 1);
    this.setState({todos: todos});
  }

  componentDidMount() {
    axios.get('/api/v1/todos')
    .then(res => {
      this.setState({todos: res.data});
    })
    .catch(error => {
      console.log(error);
    });
  }

  addTodo(e){
    e.preventDefault();
    axios.post('/api/v1/todos/new/', {
      text: 'Clean the dog',
      due_date: '2020-11-21'
    })
    .then(res => {
      console.log(res);
      let todos = [...this.state.todos];
      todos.push(res.data)

      this.setState({todos});
    })
    .catch(error => {
      console.log(error);
    })
  }
  render() {

    let todos = this.state.todos.map(todo => (
      <li key={todo.id}>
        <p>{todo.text}</p>
        <time>{todo.due_date}</time>
        <li><button onClick={() => this.removeTodo(todo)}>Delete</button></li>
      </li>
    ));
    return (
      <ul>
        <React.Fragment>
        <li>
          <form onSubmit={this.addTodo}>
            <input type='text'/>
            <button>add</button>
          </form>
          {todos}
          </li>
        </React.Fragment>
      </ul>
    )
  }
}

export default App;
