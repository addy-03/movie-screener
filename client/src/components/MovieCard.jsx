import visibleIcon from "../assets/icons/visible-icon.svg";
import invisibleIcon from "../assets/icons/invisible-icon.svg";
import shortlistIcon from "../assets/icons/red-heart-icon.png";
import notShortlistIcon from "../assets/icons/heart-outline-icon.png";
import starIcon from "../assets/icons/star-icon.png";
import halfStarIcon from "../assets/icons/star-half-icon.png";
import { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../context/moviesContext";

const MovieCard = ({ data }) => {
  const { dispatch } = useContext(MoviesContext);
  const [rating, setRating] = useState(0);
  const [ratingEl, setRatingEl] = useState([]);

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

  const calculateRating = () => {
    let score = [
      parseFloat(data.rating[0].score.split("/")[0]),
      parseFloat(data.rating[1].score.split("%")[0]),
      parseFloat(data.rating[2].score.split("/")[0]),
    ];

    let rating = (score[0] / 2 + (score[1] * 5) / 100 + score[2]) / 3;
    setRating(rating.toFixed(1));
    // console.log("rating", rating);

    let i = 0;
    setRatingEl([]);
    for (let index = 0; index < parseInt(rating); index++) {
      setRatingEl((state) => [
        ...state,
        <img key={index} src={starIcon} alt="star" />,
      ]);
      i = index;
      // console.log(index, "ratingEl");
    }
    if (rating - parseInt(rating) > 0) {
      setRatingEl((state) => [
        ...state,
        <img key={i + 1} src={halfStarIcon} alt="star" />,
      ]);
    }
  };

  // 1) Blue ( isVisible = True & isShortlist = True )
  // 2) Orange ( isVisible = True & isShortlist = False )
  // 3) Yellow ( isVisible = False & isShortlist = False )
  // 4) Black ( isVisible = False & isShortlist = True )

  const [bgColor, setBgColor] = useState("");

  const changeBgColor = () => {
    if (data.isVisible === true && data.isShortlisted === true) {
      setBgColor("blue");
    } else if (data.isVisible === true && data.isShortlisted === false) {
      setBgColor("orange");
    } else if (data.isVisible === false && data.isShortlisted === false) {
      setBgColor("yellow");
    } else if (data.isVisible === false && data.isShortlisted === true) {
      setBgColor("black");
    }
  };

  useEffect(() => {
    // console.log([data.isShortlisted, data.isVisible]);
    changeBgColor();
  }, [data, data.isShortlisted, data.isVisible]);

  useEffect(() => {
    calculateRating();
  }, [data, data.rating]);

  return (
    <div className={`movie-card bg-${bgColor}`}>
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
      <div className="rating">
        {ratingEl}
        {rating}/5
      </div>
    </div>
  );
};

export default MovieCard;
