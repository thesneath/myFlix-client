import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ show, setShow ] = useState(false);

  const handleSumbit = (e) => {
    e.preventDefault();
    axios.post('https://alexdb.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      setShow(true);
      console.log('no such user')
    })
  };

  return (
    <Form>
      {show ? <Alert variant="danger">Please enter valid username and password</Alert> : <></> }
      <Form.Group controlId="username">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSumbit}>Submit</Button>{' '}
      <Link to="/register">
        <Button variant="secondary">Sign up</Button>
      </Link>
    </Form>
  )
} 

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
}