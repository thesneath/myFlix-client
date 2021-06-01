import React from "react";
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import axios from "axios";

export class MovieView extends React.Component {

  handleFavorite(movie) {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');

    axios.post(`https://alexdb.herokuapp.com/users/${user}/Movies/${movie}`,{},{
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      console.log(`${movie} added to favorites`)
    })
    .catch(e => {
      console.log(e);
    })
  }

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount(){
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount(){
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title} </span>
        </div>
        <div className="movie-title">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>
        <Button onClick={() => this.handleFavorite(movie._id)} >Add to Favorites</Button>
        <Button onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    );
  }
}
