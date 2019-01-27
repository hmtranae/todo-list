import React, { Component } from 'react'

export default class App extends Component {
  state = {
    todos: [],
    inputVal: ''
  }

  componentDidMount = () => {}

  componentDidUpdate = () => {}

  onSubmit = e => {
    if (e.key === 'Enter' && this.state.inputVal) {
      this.setState(
        {
          todos: [...this.state.todos, e.target.value],
          inputVal: ''
        },
        () => localStorage.setItem('todos', JSON.stringify(this.state.todos))
      )
    }
  }

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
