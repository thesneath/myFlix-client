import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function RegisterView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = () => {
    event.preventDefault();
    axios
      .post("https://alexdb.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
      })
      .catch((e) => {
        setShow(true);
        console.log("error registering the user");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {show ? <Alert variant="danger">
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
      <Button variant="primary" type="submit">
        Sign Up
      </Button>{" "}
      {/* <Button variant="secondary" type="submit" onClick={props.toggleRegister}>Back</Button> */}
    </Form>
  );
}

RegisterView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
};
