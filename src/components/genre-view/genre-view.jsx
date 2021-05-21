import React from 'react';
import Button from 'react-bootstrap/Button';


export class GenreView extends React.Component {
  render () {
    const { genre, onBackClick } = this.props;

    return (
      <div>
        <div>
          <span>Genre: </span>
          <span>{genre.Name}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{genre.Description}</span>
        </div>
        <Button onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    )
  }
}