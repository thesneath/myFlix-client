import React from 'react';
import Button from 'react-bootstrap/Button';

import './genre-view.scss';

export class GenreView extends React.Component {
  render () {
    const { genre, onBackClick } = this.props;

    return (
      <div className="genre-view">
        <div>
          <p>Genre: {genre.Name}</p>
        </div>
        <div>
          <p>Description: {genre.Description}</p>
        </div>
        <Button className="float-right" onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    )
  }
}