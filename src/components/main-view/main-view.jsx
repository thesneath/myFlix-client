import React from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: "Inception",
          Description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
          ImagePath: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
        },
        {
          _id: 2,
          Title: "Shawshank Redemption",
          Description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
          ImagePath: "https://images-na.ssl-images-amazon.com/images/I/519NBNHX5BL._SY445_.jpg",
        },
        {
          _id: 3,
          Title: "Gladiator",
          Description: "Russel Crowe stars as Big Tuffman in this warrior epic.",
          ImagePath: "https://media.samishleather.com/wp-content/uploads/2015/12/The-Nice-Guys-Russell-Crowe-Jacket.jpg",
        }
      ],

      selectedMovie: null,
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0)
      return <div className="main-view">This list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
