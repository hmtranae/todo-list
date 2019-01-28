import React, { Component } from 'react'

export default class App extends Component {
  // todos array holds all todo items
  // inputVal is todo text currently being inputted
  state = {
    // initial value of todos is empty array
    todos: [],
    inputVal: '',
  }

  componentDidMount = () => {
    // todos array will be grabbed from localStorage getItem if localStorage is not empty
    if (localStorage.length) {
      this.setState({
        todos: JSON.parse(localStorage.getItem('todos'))
      })
    }
  }

  componentDidUpdate = () => {}

  // submit only if e.key is enter key and not empty input value
  onSubmit = e => {
    if (e.key === 'Enter' && this.state.inputVal) {
      const todo = { value: e.target.value, isHovering: false }
      this.setState(
        {
          todos: [...this.state.todos, todo],
          // using controlled inputs, reset inputVal to be empty
          inputVal: ''
        }, // callback function using localstorage setter to update its todo list
        () => localStorage.setItem('todos', JSON.stringify(this.state.todos))
      )
    }
  }

  // updates the controlled input with onChange
  onChange = e => {
    this.setState({ inputVal: e.target.value })
  }

  // handleMouseEnter takes sets isHovering to be true and updates localstorage
  // i gives the id of that todo
  handleMouseEnter = selectedTodo => {
    const todos = this.state.todos
    const index = todos.findIndex(todo => todo.value === selectedTodo.value)
    todos[index].isHovering = true
    this.setState({ todos }, () =>
      localStorage.setItem('todos', JSON.stringify(this.state.todos))
    )
  }

  // handleMouseLeave takes sets isHovering to be false and updates localstorage
  handleMouseLeave = selectedTodo => {
    const todos = this.state.todos
    const index = todos.findIndex(todo => todo.value === selectedTodo.value)
    todos[index].isHovering = false
    this.setState({ todos }, () =>
      localStorage.setItem('todos', JSON.stringify(this.state.todos))
    )
  }

  deleteTodo = selectedTodo => {
    // use filter to update todo array state and update localstorage
    this.setState(
      {
        todos: this.state.todos.filter(
          todo => todo.isHovering !== selectedTodo.isHovering
        )
      },
      () => localStorage.setItem('todos', JSON.stringify(this.state.todos))
    )
  }

  selectAllTodos = () => {
    console.log('hi')
  }

  render() {
    // console.log(this.state.todos)
    return (
      <div className="ui center aligned text container">
        <h1
          style={{ opacity: '0.3', fontSize: '100px' }}
          className="ui red center aligned block header"
        >
          todos
        </h1>
        <div className="ui massive form">
          <div className="ui left icon fluid input">
            {/* select all todo icon if there is at least one todo */}
            {/* chevron icon when clicked will select all todos */}
            {this.state.todos.length ? (
              <i
                onClick={this.selectAllTodos}
                style={{ opacity: '0.4' }}
                className="chevron down link icon"
              />
            ) : null}
            <input
              onChange={this.onChange}
              onKeyPress={this.onSubmit}
              value={this.state.inputVal}
              type="text"
              placeholder="What needs to be done?"
            />
          </div>
        </div>
        {/* map through todos list and only show if length of todo is greater than 0 */}
        {this.state.todos.length ? (
          <div className="ui stacked segments">
            {this.state.todos.map((todo, i) => {
              return (
                <div
                  key={i}
                  className="ui left aligned secondary segment" // show delete icon when mouse over that todo
                  onMouseEnter={this.handleMouseEnter.bind(null, todo)}
                  onMouseLeave={this.handleMouseLeave.bind(null, todo)}
                >
                  <p style={{ paddingLeft: '10px', fontSize: '20px' }}>
                    {todo.value}
                    {/* will show delete icon if isHovering property is true */}
                    {todo.isHovering ? (
                      <i
                        onClick={this.deleteTodo.bind(null, todo)}
                        style={{
                          opacity: '0.4',
                          float: 'right',
                          verticalAlign: 'center'
                        }}
                        className="x red link icon"
                      />
                    ) : null}
                  </p>
                </div>
              )
            })}
          </div>
        ) : (
          <span />
        )}
      </div>
    )
  }
}
