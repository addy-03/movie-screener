import MovieCard from "./components/MovieCard";
import "./styles/app.scss";

const data = {
  title: "THOR",
  desc: "Falling in love with scientist Jane Foster (Natalie Portman) teaches Thor much-needed lessons, and his new-found strength comes into play as a villain from his homeland sends dark forces toward Earth.",
  img: "https://as2.ftcdn.net/v2/jpg/05/62/12/87/1000_F_562128745_Pt2bgKtkf0L5zbabWDeji6sGoszjFyfL.jpg",
  isVisible: "TRUE",
  isShortlisted: "FALSE",
  label: "TOP 10",
  rating: [
    {
      score: "7/10",
    },
    {
      score: "60%",
    },
    {
      score: "3/5",
    },
  ],
};

function App() {
  return (
    <div className="App">
      <h1>Movie Screener</h1>
      <div className="container">
        <MovieCard data={data} />
        <MovieCard data={data} />
        <MovieCard data={data} />
        <MovieCard data={data} />
        <MovieCard data={data} />
      </div>
    </div>
  );
}

export default App;
