import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialCreds = {
  username: "",
  password: ""
};

const Login = ({ history }) => {
  const [creds, setCreds] = useState(initialCreds);
  const [error, setError] = useState(null);
  const handleChange = e => setCreds({...creds, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/auth/login', creds)
      .then(res => {
        console.log(res);
        setCreds(initialCreds);
        localStorage.setItem('token', res.data.token);
        history.push("/");
      })
      .catch(err => {
        console.log(err.response);
        // err.response.status === 401
        err.response.data.message && setError(err.response.data.message);
      });
  };
  return(
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}
        <input placeholder="username"
              name="username"
              value={creds.username}
              onChange={handleChange}
        />
        <input type="password"
              placeholder="password"
              name="password"
              value={creds.password}
              onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;