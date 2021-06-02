import "./movie-card.scss";
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {

  render(){
    const { movie } = this.props;
    return (
        <Card >
          <Card.Img variant="top" className="poster" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button className="btn ml-auto" variant="link">Open</Button>
            </Link>
          </Card.Body>
        </Card>
    )
  }
}

MovieCard.propTypes ={
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string
  }).isRequired
};