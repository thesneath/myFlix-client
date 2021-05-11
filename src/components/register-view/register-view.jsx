import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegisterView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('')


  const handleSubmit = () => {
    event.preventDefault();
    console.log(username, password, email, birthday);


    props.onRegister(username)
  }

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label><label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label><label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label><label>
        Birthday:
        <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit} >Sign Up</button>
      <button type="submit" onClick={props.toggleRegister}>Log in</button>
    </form>
  )
}

RegisterView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  onRegister: PropTypes.func.isRequired
}