import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import './App.css';

import Users from './components/Users.js';
import Login from './components/Login.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavLink to="/" style={{"color": "white"}}>Home</NavLink>
        <NavLink to="/login" style={{"color": "white"}}>Login</NavLink>
        <NavLink to="/users" style={{"color": "white"}}>Users</NavLink>
      </header>
      <Route path="/users" exact component={Users} />
      <Route path="/login" component={Login} />
    </div>
  );
}

export default App;
