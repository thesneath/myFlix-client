import React from "react";
import axios from "axios";
import moment from "moment";

import Button from "react-bootstrap/Button";

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
        console.log(data.Email);
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
      })
      .catch((e) => console.log(e));
  }

  render() {
    const { user, movie } = this.props;
    console.log(movie);
    const favMovies = movie.filter(
      (movie) => movie._id == this.state.FavoriteMovies
    );
    console.log(favMovies);
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
          {this.state.Birthday ? (
            <span>{moment(this.state.Birthday).format("MM/DD/YYYY")}</span>
          ) : (
            <span />
          )}
        </div>

        <div>
          <span>Favorite Movies: </span>
          {this.state.FavoriteMovies.length < 1 ? (
            <span>None</span>
          ) : (
            <span>
              {favMovies.map((m) => (
                <>
                  <MovieCard movie={m} key={m._id} />
                  <Button key={1} variant="danger" onClick={() => this.removeFav(m._id)}>Remove</Button>
                </>
              ))}
            </span>
          )}
        </div>

        <ProfileUpdate />
      </div>
    );
  }
}
