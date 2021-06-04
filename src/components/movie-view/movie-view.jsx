import React from "react";
import "./movie-view.scss";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import axios from "axios";

export class MovieView extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isAdded: false,
    }
  }

  handleFavorite(movie) {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');

    axios.post(`https://alexdb.herokuapp.com/users/${user}/Movies/${movie}`,{},{
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      this.setState({
        isAdded: true
      });
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
      <Card className="movie-view ">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
        <Card.Title className="movie-title">
          {movie.Title}
        </Card.Title>
        <Card.Text>
          {movie.Description}
        </Card.Text>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>
        <Button variant="secondary" className="btn-block" onClick={() => this.handleFavorite(movie._id)} >{this.state.isAdded ? "Added to Favorites" : "Add to Favorites"}</Button>
        <Button className="btn-block" onClick={() => { onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
    );
  }
}
