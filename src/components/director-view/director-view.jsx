import React from 'react';
import Button from 'react-bootstrap/Button';

import './director-view.scss';


export class DirectorView extends React.Component {
  render () {
    const { director, onBackClick } = this.props;

    return (
      <div className="director-view">
        <div>
          <p>Director: {director.Name}</p>
        </div>
        <div>
          <p>Birth Year: {director.Birthyear}</p>
        </div>
        <div>
          <p>Bio: {director.Bio}</p>
        </div>
        <Button className="float-right" onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    )
  }
}