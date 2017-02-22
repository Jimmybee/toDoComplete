import React from "react";
import * as TodoActions from "../actions/TodoActions";


export default class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        isEditting: false
    };
  }

  render() {
    const { complete, edit, text } = this.props;

    const icon = complete ? "\u2714" : "\u2716"

    const taskStyle = {
            color: complete ? 'green' : 'red',
            cursor: 'pointer'
            };

    if (this.state.isEditting) {
      return ( 
        <li>
        <form onSubmit={this.submitEdit.bind(this)}>
            <input defaultValue={text} focus="focused" ref="editInput"/>
            <button onClick={this.onEditClick.bind(this)}>Save</button>
            <button>Cancel</button>
        </form>
     </li>
     )
    }

    return (
      <li>
        <span style={taskStyle} onClick={this.onCompletedClick.bind(this)}>{text}</span>
        <span>{icon}</span>
        <button onClick={this.onEditClick.bind(this)}>Edit</button>
        <button onClick={this.onDeleteClick.bind(this)}>Delete</button>
      </li>
    );
  }

  onEditClick() {
    this.setState ({isEditting: true}); 
  }

  onCompletedClick() {
    TodoActions.switchComplete(this.props.id)
  }

  submitEdit(event) {
    event.preventDefault()

    const id = this.props.id
    const newText = this.refs.editInput.value

    TodoActions.updateTodo(id, newText)
    this.setState ({isEditting: false}); 
  }

  onDeleteClick() { 
    event.preventDefault()
    TodoActions.deleteTodo(this.props.id)
  }


}
