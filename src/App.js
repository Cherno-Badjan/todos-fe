import React, { Component } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Header from './components/Header.js';
import Home from './Home/Home.js';
import SignUp from './AuthPages/SignUp.js';
import Login from './AuthPages/Login.js';
import TodosListPage from './TodosListPage/TodosListPage.js';
export default class App extends Component {
  state = {
    user: '',
  }

  handleUserChange = (user) => {
    this.setState({ user })

    localStorage.setItem(user);
  }
  render() {
    return (
      <div className="App" >
        <Router>
          <Header user={this.state.user} />
          <Switch>
            <Route path="/" exact render={(routerProps) => <Home {...routerProps} />} />
            <Route path="/login" exact render={(routerProps) => <Login handleUserChange={this.handleUserChange}{...routerProps} />} />
            <Route path="/signup" exact render={(routerProps) => <SignUp handleUserChange={this.handleUserChange}{...routerProps} />} />
          </Switch>
        </Router>
      </div>
    )
  };
}
