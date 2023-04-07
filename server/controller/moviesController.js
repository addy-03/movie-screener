const { movies } = require("../data/moviesData");

class MoviesController {
  async getAllMovies() {
    return new Promise((resolve, _) => resolve({ movies }));
  }

  async getMovieLabels() {
    return new Promise((resolve, _) => {
      let labels = new Set();
      movies.forEach((element) => {
        labels.add(element.label);
      });
      labels = [...labels];
      resolve({ labels });
    });
  }

  async getMoviesByLabel(label) {
    return new Promise((resolve, _) => {
      const filteredMovies = movies.filter(
        (element) => element.label.toLowerCase() === label.toLowerCase()
      );
      //   console.log(filteredMovies);
      resolve({ movies: filteredMovies });
    });
  }
}

module.exports = MoviesController;
