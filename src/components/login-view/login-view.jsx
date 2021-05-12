import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSumbit = (e) => {
    e.preventDefault();
    console.log(username, password);

    props.onLoggedIn(username);
  };

  return (
    <Form>
      <Form.Group controlId="username">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSumbit}>Submit</Button>{' '}
      <Button variant="secondary" type="submit" onClick={props.toggleRegister}>Sign up</Button>
    </Form>
  )
} 

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
}