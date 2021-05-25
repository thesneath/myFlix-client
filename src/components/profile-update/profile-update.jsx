import React, { useState } from "react";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export function ProfileUpdate() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const handleSubmit = () => {
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
        console.log(response);
        const data = response.data;
        localStorage.setItem("user", data.Username);
        localStorage.setItem("token", data.Password);
        window.open(`/user/${user}`, '_self')
        handleClose();
      })
      .catch((e) => console.log(e));
  };

  const handleDelete = () => {
    event.preventDefault();
    axios.delete(`https://alexdb.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` } 
    })
    .then(response => {
      alert(`User: ${user} was deleted`);
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
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">Please Choose a password</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="birthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>
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
