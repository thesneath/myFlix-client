import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegisterView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('')


  const handleSubmit = () => {
    event.preventDefault();
    console.log(username, password, email, birthday);
    axios.post('https://alexdb.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self');
    })
    .catch(e => {
      console.log('error registering the user');
    })
  }

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

      <Form.Group controlId="email">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="birthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit} >Sign Up</Button>{' '}
      {/* <Button variant="secondary" type="submit" onClick={props.toggleRegister}>Back</Button> */}
    </Form>
  )
}

RegisterView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
}