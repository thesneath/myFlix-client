import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view.jsx';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import './index.scss';

class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/#">AlexMDB</Navbar.Brand>
          <Nav className="justify-content-md-end" activeKey="/home">
            <Nav.Item>
              <Nav.Link href={`/users/${localStorage.getItem('user')}`}>Account</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
        <MainView />
      </Container>
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);