import './profile-view.scss';
import React from "react";
import axios from "axios";
import moment from "moment";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { ProfileUpdate } from "../profile-update/profile-update.jsx";
import { MovieCard } from "../movie-card/movie-card.jsx";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: "",
      Email: "",
      Birthday: "",
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    this.getUser(user, token);
  }

  getUser(user, token) {
    axios
      .get(`https://alexdb.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data;
        console.log(data.FavoriteMovies);
        this.setState({
          Username: data.Username,
          Email: data.Email,
          Password: data.Password,
          Birthday: data.Birthday,
          FavoriteMovies: data.FavoriteMovies,
        });
      })
      .catch((error) => console.log(error));
  }

  removeFav(movie) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    event.preventDefault();
    axios
      .delete(`https://alexdb.herokuapp.com/users/${user}/Movies/${movie}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(`${movie} removed from favorites`);
        this.setState({
          FavoriteMovies: this.state.FavoriteMovies.filter(m => m._id === movie )
        })
      })
      .catch((e) => console.log(e));
  }

  updateUser = (user) => {
    this.setState({
      ...user
    })
  }

  render() {
    const { user, movie } = this.props;
    const favMovies = movie.filter(
      (movie) => movie._id === this.state.FavoriteMovies
    );
    return (
      <div className="profile-view" >
          <p>Username: {this.state.Username}</p>

          <p>Email: {this.state.Email}</p>

          {this.state.Birthday ? (
            <p>Birthday: {moment(this.state.Birthday).format("MM/DD/YYYY")}</p>
          ) : (
            <p>Birthday:</p>
          )}
          <span>Favorite Movies: </span>
          {this.state.FavoriteMovies.length === 0 ? (
            <span>None</span>
          ) : (
            <div>
              {favMovies.map((m) => (
                <Col key={m}>
                  <MovieCard movie={m}> 
                    <Button variant="danger" onClick={() => this.removeFav(m._id)}>Remove</Button>
                  </MovieCard>
                </Col>
              ))}
            </div>
          )}
        <Row>
          <Col>
            <ProfileUpdate updateUser={this.updateUser} />
          </Col>
        </Row>
      </div>
    );
  }
}
