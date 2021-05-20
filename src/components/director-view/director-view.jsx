import React from 'react';
import Button from 'react-bootstrap/Button';


export class DirectorView extends React.Component {
  render () {
    const { director, onBackClick } = this.props;

    return (
      <div>
        <div>
          <span>Director:</span>
          <span>{director.Name}</span>
        </div>
        <div>
          <span>Birth Year:</span>
          <span>{director.Birthyear}</span>
        </div>
        <div>
          <span>Bio:</span>
          <span>{director.Bio}</span>
        </div>
        <Button onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    )
  }
}