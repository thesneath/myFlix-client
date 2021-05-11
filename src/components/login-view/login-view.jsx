import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSumbit = (e) => {
    e.preventDefault();
    console.log(username, password);

    props.onLoggedIn(username);
  };

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSumbit}>Submit</button>
      <button type="submit" onClick={props.toggleRegister}> Sign up</button>
    </form>
  )
} 

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
}