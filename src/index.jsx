import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view.jsx';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';

import './index.scss';

class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/#">AlexMDB</Navbar.Brand>
        </Navbar>
        <MainView />
      </Container>
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);