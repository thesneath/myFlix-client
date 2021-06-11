import React from "react";
import axios from "axios";

import { connect } from 'react-redux';

import './main-view.scss';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { LoginView } from "../login-view/login-view.jsx";
// import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { RegisterView } from "../register-view/register-view.jsx";
import { GenreView } from "../genre-view/genre-view.jsx";
import { DirectorView } from "../director-view/director-view.jsx";
import { ProfileView } from "../profile-view/profile-view.jsx";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";

class MainView extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   user: null,
    // };
  }

  getMovies(token) {
    axios
      .get("https://alexdb.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'))
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log("authdata" + authData);
    this.props.setUser(authData.user.Username)

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.props.setUser('');
  }

  render() {
    const { movies, user} = this.props;
    // const { user } = this.state;

    return (
      <>
        <Navbar  variant="dark" className="my-4 mx-auto py-3 navbar">
          <Navbar.Brand href="/">AlexMDB</Navbar.Brand>
          {user ? (
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Item>
                  <Nav.Link href={`/users/${user}`}>Account</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => this.onLoggedOut()} href="/">
                    Log Out
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          ) : (
            <></>
          )}
        </Navbar>
        <Router>
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return <MoviesList movies={movies} />;
              }}
            />

            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col>
                    <RegisterView />
                  </Col>
                );
              }}
            />

            <Route
              path="/users/:name"
              render={({ history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                return (
                  <Col md={8}>
                    <ProfileView
                      user={user}
                      movie={movies}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <DirectorView
                      director={
                        movies.find(
                          (m) => m.Director.Name === match.params.name
                        ).Director
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <GenreView
                      genre={
                        movies.find((m) => m.Genre.Name === match.params.name)
                          .Genre
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Router>
      </>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies, 
    user: state.user
  }
}

export default connect(mapStateToProps, { setMovies, setUser } )(MainView);
