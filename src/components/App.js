import React, { Component } from 'react'

export default class App extends Component {
  // todos array holds all todo items
  // inputVal is todo text currently being inputted
  state = {
    // initial value of todos is empty array
    todos: [],
    inputVal: '',
    isHovering: false
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
      const todo = {value: e.target.value, isHovering: false}
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

  // handleMouseHover returns opposite of isHovering
  // i gives the id of that todo
  handleMouseHover = i => {
    console.log(i)
    this.setState({
      isHovering: !this.state.isHovering
    })
  }

  deleteTodo = () => {
    console.log('hi')
  }

  render() {
    // console.log(this.state.isHovering)
    return (
      <div className="ui center aligned text container">
        <h1
          style={{ opacity: '0.3', fontSize: '100px' }}
          className="ui red center aligned block header"
        >
          todos
        </h1>
        <div className="ui massive form">
          <div className="field">
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
                  className="ui left aligned secondary segment"
                  // show delete icon when mouse over that todo
                  onMouseEnter={this.handleMouseHover.bind(null, i)}
                  onMouseLeave={this.handleMouseHover}
                >
                  <p style={{ paddingLeft: '10px', fontSize: '20px' }}>
                    {todo.value}
                    {todo.isHovering ? (
                      <button
                        onClick={this.deleteTodo}
                        className="ui red basic right floated icon button"
                      >
                        <i className="x icon" />
                      </button>
                    ) : (
                      <span />
                    )}
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
