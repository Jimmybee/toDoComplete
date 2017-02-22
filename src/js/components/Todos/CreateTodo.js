import React from "react";
import * as TodoActions from "../../actions/TodoActions";

export default class CreateTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        error: null
    };
  }

  renderError() {
    if (this.state.error) {
      return (
        <div style={{ color : 'red'}}> {this.state.error} </div>
      );
    }
  }

  render() {
    return (
      <form onSubmit={this.handleCreate.bind(this)}>
        <input type="text" placeholder="Write in here" ref="createInput"/>
        <button> Add new </button>
        {this.renderError()}
      </form>
    );
  }

  handleCreate(event) {
    event.preventDefault();

    const input = this.refs.createInput;
    const text = input.value;
    const invalidText = this.invalidInput(text);

    if (invalidText) {
      this.setState ({ error: invalidText })
      return
    }

    this.setState ({ error: null })
    this.refs.createInput.value = null
    TodoActions.createTodo(text)

  }


  invalidInput(text){
    if (!text) {
      return "Please enter a task"
    }

  }
}
