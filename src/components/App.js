import React, { Component } from 'react'

export default class App extends Component {
  // todos array holds all todo items
  // inputVal is todo text currently being inputted
  state = {
    todos: [],
    inputVal: ''
  }

  componentDidMount = () => {}

  componentDidUpdate = () => {}

  // submit only if e.key is enter key and not empty input value
  onSubmit = e => {
    if (e.key === 'Enter' && this.state.inputVal) {
      this.setState(
        {
          todos: [...this.state.todos, e.target.value],
          // using controlled inputs, reset inputVal to be empty
          inputVal: ''
        },
        // callback function using localstorage setter to update its todo list
        () => localStorage.setItem('todos', JSON.stringify(this.state.todos))
      )
    }
  }

  // updates the controlled input with onChange
  onChange = e => {
    this.setState({
      inputVal: e.target.value
    })
  }

  render() {
    return (
      <div className="ui center aligned container">
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
      </div>
    )
  }
}
