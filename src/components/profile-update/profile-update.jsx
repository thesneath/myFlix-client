import React, { useState } from "react";
import axios from "axios";

import Alert from 'react-bootstrap/Alert';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export function ProfileUpdate(props) {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [alert, setAlert] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(
        `https://alexdb.herokuapp.com/users/${user}`,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const data = response.data;
        localStorage.setItem("user", data.Username);
        props.updateUser(response.data)
        handleClose();
      })
      .catch(e => {
        setAlert(true);
        console.log(e);
      })
  }
  

  const handleDelete = () => {
    event.preventDefault();
    axios.delete(`https://alexdb.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` } 
    })
    .then(response => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      handleClose();
      window.open('/', '_self');
    })
    .catch(e => {
      console.log(e)
    })
  }


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Update Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
      {alert ? <Alert variant="danger">
        <Alert.Heading>Invalid Information</Alert.Heading>
        <p>Here's what may be wrong:</p>
        <ul>
          <li>Username must be at least 5 characters</li>
          <li>Must be a valid Email</li>
          <li>Must include a password and birthday</li>
        </ul>
      </Alert> : <></>}
      <Form.Group controlId="username">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="birthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          required
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>
      {/* <Button variant="secondary" type="submit" onClick={props.toggleRegister}>Back</Button> */}
    </Form>
         

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
          <Button variant="danger" onClick={handleDelete}>Delete Account</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
