import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import "./styles/app.scss";

// const data = {
//   title: "THOR",
//   desc: "Falling in love with scientist Jane Foster (Natalie Portman) teaches Thor much-needed lessons, and his new-found strength comes into play as a villain from his homeland sends dark forces toward Earth.",
//   img: "https://as2.ftcdn.net/v2/jpg/05/62/12/87/1000_F_562128745_Pt2bgKtkf0L5zbabWDeji6sGoszjFyfL.jpg",
//   isVisible: "TRUE",
//   isShortlisted: "FALSE",
//   label: "TOP 10",
//   rating: [
//     {
//       score: "7/10",
//     },
//     {
//       score: "60%",
//     },
//     {
//       score: "3/5",
//     },
//   ],
// };

// APIS
// http://localhost:5000/movies?filter=NEW
// http://localhost:5000/movies

function App() {
  const [movies, setMovies] = useState(null);
  const [labels, setLabels] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/movies", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(async (res) => {
        setMovies(await res.json());
        // console.log(await res.json());
      })
      .catch((error) => {
        console.log(error);
      });

    fetch("http://localhost:5000/movies/labels", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(async (res) => {
        setLabels(await res.json());
        console.log(labels);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="app">
      <div className="header">
        <h1 className="Brand">Movie Screener</h1>
        <div className="filter-menu">
          <ul>
            {labels && labels.labels.map((label) => <li key={label} className="item">{label}</li>)}
          </ul>
        </div>
      </div>

      <div className="container">
        {movies &&
          movies.movies.map((element) => (
            <MovieCard key={element.title} data={element} />
          ))}
      </div>
    </div>
  );
}

export default App;
