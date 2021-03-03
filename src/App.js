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
import { getUserFromLs, putUserInLs } from './local-storage-utils.js';
import PrivateRouter from './components/PrivateRouter.js';
export default class App extends Component {
  state = {
    user: getUserFromLs(),
  }

  handleUserChange = (user) => {
    this.setState({ user })

    putUserInLs(user);
  }
  render() {
    const { user } = this.state;
    return (
      <div className="App" >
        <Router>
          <Header user={this.state.user} />
          <Switch>
            <Route path="/" exact render={(routerProps) => <Home {...routerProps} />} />
            <PrivateRouter path="/todos" exact token={user && user.token} render={(routerProps) => <TodosListPage user={this.state.user}{...routerProps} />} />
            <Route path="/login" exact render={(routerProps) => <Login handleUserChange={this.handleUserChange}{...routerProps} />} />
            <Route path="/signup" exact render={(routerProps) => <SignUp handleUserChange={this.handleUserChange}{...routerProps} />} />
          </Switch>
        </Router>
      </div>
    )
  };
}
