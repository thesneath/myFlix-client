import React from "react";
import axios from 'axios';

import { LoginView } from "../login-view/login-view.jsx";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { RegisterView } from "../register-view/register-view.jsx";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: false
    };
  }

  componentDidMount(){
    axios.get('https://alexdb.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(user) {
    this.setState({ user });
  }

  onRegister(register) {
    this.setState({ register })
  }

  toggleRegister = (e) => {
    e.preventDefault();
    this.setState({ register: !this.state.register })
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if(register) return <RegisterView onRegister={register => this.onRegister(register)} />

    if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} toggleRegister={this.toggleRegister}/> 
    
    if (movies.length === 0)
      return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
