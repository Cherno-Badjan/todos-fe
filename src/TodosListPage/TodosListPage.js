import React, { Component } from 'react'
import { getTodos, addTodo, completeTodo } from '../api-utils.js';

export default class TodosListPage extends Component {
    state = {
        todos: [],
        todo: '',
    }

    componentDidMount = async () => {
        await this.fetchTodos();
    }

    fetchTodos = async () => {
        const todos = await getTodos(this.props.user.token);

        this.setState({ todos });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await addTodo(this.state.todo, this.props.user.token);

        await this.fetchTodos();

        this.setState({ todo: '' })
    }

    handleTodoChange = (e) => {
        this.setState({ todo: e.target.value })
    }

    handleComplete = async (todoId) => {
        await completeTodo(todoId, this.props.user.token);

        this.fetchTodos();
    }
    render() {
        console.log(this.state.todos)
        return (
            <div className="todoList">
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.todo} onChange={this.handleTodoChange} />
                    <button>Add Task</button>
                </form>
                <div>
                    {!this.state.todos.length && <p>All tasks completed!</p>}
                    {this.state.todos.map(todo => <p key={`${todo.todo}`} onClick={() => this.handleComplete(todo.id)}
                        className={`todo ${todo.completed} 
                        ? 'true' : ''}`}> {todo.todo}</p>)}
                </div>
            </div>
        )
    }
}
