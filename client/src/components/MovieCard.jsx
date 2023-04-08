import visibleIcon from "../assets/icons/visible-icon.svg";
import invisibleIcon from "../assets/icons/invisible-icon.svg";
import shortlistIcon from "../assets/icons/red-heart-icon.png";
import notShortlistIcon from "../assets/icons/heart-outline-icon.png";
import { useContext } from "react";
import { MoviesContext } from "../context/moviesContext";

const MovieCard = ({ data }) => {
  const { dispatch } = useContext(MoviesContext);
  const handleShortlist = () => {
    fetch("http://localhost:5000/movies/shortlist/" + data.title, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(async (res) => {
        // console.log("shortlisted API", await res.json());
        const movie = (await res.json()).movie;
        dispatch({ type: "UPDATE_MOVIE", payload: movie });
        console.log(movie);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleVisible = () => {
    fetch("http://localhost:5000/movies/visible/" + data.title, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(async (res) => {
        // console.log("shortlisted API", await res.json());
        const movie = (await res.json()).movie;
        dispatch({ type: "UPDATE_MOVIE", payload: movie });
        console.log(movie);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="movie-card">
      <img
        className={`toggle-btn visible visible-${data.isVisible}`}
        src={data.isVisible ? visibleIcon : invisibleIcon}
        onClick={handleVisible}
      />
      <img
        className={`toggle-btn shortlist shortlist-${data.isShortlisted}`}
        src={data.isShortlisted ? shortlistIcon : notShortlistIcon}
        onClick={handleShortlist}
      />
      <div className="image-wrapper">
        <div className="label">{data.label}</div>
        <img className="image" src={data.img} />
      </div>
      <div className="title">{data.title}</div>
      <div className="description">{data.desc}</div>
      <div className="rating">{data.rating[2].score}</div>
    </div>
  );
};

export default MovieCard;
