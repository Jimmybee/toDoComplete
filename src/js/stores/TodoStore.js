import { EventEmitter } from "events";
import _ from 'lodash';

import dispatcher from "../dispatcher";

class TodoStore extends EventEmitter {
  constructor() {
    super()
    this.todos = [
      {
        id: 113464613,
        text: "Go Shopping",
        complete: true
      },
      {
        id: 235684679,
        text: "Pay Water Bill",
        complete: false
      },
    ];
  }

  createTodo(text) {
    const id = Date.now();
    console.log(id)
    this.todos.push({
      id,
      text,
      complete: false,
    });

    this.emit("change");
  }

  updateTodo(id, newText) {
        const todo = _.find(this.todos, todo => todo.id === id);
        todo.text = newText
        this.emit("change")
  }

  getAll() {
    return this.todos;
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_TODO": {
        this.createTodo(action.text);
        break;
      }
      case "RECEIVE_TODOS": {
        this.todos = action.todos;
        this.emit("change");
        break;
      }
      case "UPDATE_TODO": {
        this.updateTodo(action.id, action.newText)
        break;
      }
       case "DELETE_TODO": {
        const todoIndex = _.findIndex(this.todos, todo => todo.id === action.id);
        this.todos.splice(todoIndex, 1)
        this.emit("change")
        break;
      }
      case "SWITCH_COMPLETE_TODO": {
        const todo = _.find(this.todos, todo => todo.id === action.id);
        todo.complete = !todo.complete
        this.emit("change")
        break;
      }
    }
  }

}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));

export default todoStore;
