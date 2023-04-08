const { movies } = require("../data/moviesData");
const fs = require("fs");

const moviesDataFile = "./data/moviesData.json";

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

  async getMovieIndexById(id) {
    return new Promise((resolve, reject) => {
      const index = movies.findIndex(
        (element) => element.title.toLowerCase() === id.toLowerCase()
      );
      console.log("getMovieIndexById", index);
      if (index !== -1) resolve(index);
      else reject(`No movie with id ${id} found`);
    });
  }

  async updateShortlistStatus(id) {
    return new Promise((resolve, reject) => {
      this.getMovieIndexById(id)
        .then((index) => {
          console.log("find", index);
          const movie = movies[index];
          console.log("initial MOvie", movies[index]);
          const updatedMovie = {
            ...movie,
            isShortlisted: !movie.isShortlisted,
          };
          movies[index] = updatedMovie;
          console.log("updated MOvie", movies[index]);

          fs.writeFileSync(
            moviesDataFile,
            JSON.stringify({ movies }),
            "utf-8",
            (err) => {
              if (err) console.log(err);
            }
          );
          resolve(movies[index]);
        })
        .catch((err) => {
          console.log("catch in updateShortlistStatus");
          reject(`No movie with id ${id} found`);
        });
    });
  }
}

module.exports = MoviesController;
