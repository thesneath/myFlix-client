import React, { useState } from 'react';

export function loginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSumbit = () => {
    e.preventDefault();
    console.log(username, password)

    props.onLoggedIn(username)
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
    </form>
  )
} 