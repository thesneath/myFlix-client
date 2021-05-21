import React from 'react';
import axios from 'axios';
import moment from 'moment';

export class ProfileView extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      Username: "",
      Email: "",
      Birthday: "",
      FavoriteMovies: []
    }
  }


  componentDidMount(){
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    this.getUser(user, token)
  }

  getUser(user, token) {
    axios.get(`https://alexdb.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      const data = response.data;
      console.log(data.Email)
      this.setState({
        Username: data.Username,
        Email: data.Email,
        Birthday: data.Birthday,
        FavoriteMovies: data.FavoriteMovies
      })
    })
    .catch(error => {
      console.log(error);
    })
  }


  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <div>
        <div>
          <span>Username: </span>
          <span>{this.state.Username}</span>
        </div>
        <div>
          <span>Email: </span>
          <span>{this.state.Email}</span>
        </div>
        <div>
          <span>Birthday: </span>
          {this.state.Birthday ? <span>{moment(this.state.Birthday).format("MM/DD/YYYY")}</span> : <span />}
        </div>
        <div>
          <span>Favorite Movies: </span>
          <span>{this.state.FavoriteMovies}</span>
        </div>
      </div>
    )
  }
}