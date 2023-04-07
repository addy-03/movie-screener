import visibleIcon from "../assets/icons/visible-icon.svg";
import invisibleIcon from "../assets/icons/invisible-icon.svg";
import shortlistIcon from "../assets/icons/red-heart-icon.png";
import notShortlistIcon from "../assets/icons/heart-outline-icon.png";

const MovieCard = ({ data }) => {
  return (
    <div className="movie-card">
      <img
        className={`toggle-btn visible visible-${data.isVisible}`}
        src={data.isVisible ? visibleIcon : invisibleIcon}
      />
      <img
        className={`toggle-btn shortlist shortlist-${data.isShortlisted}`}
        src={data.isVisible ? shortlistIcon : notShortlistIcon}
      />
      <div className="image-wrapper">
        <div className="label">{data.label}</div>
        <img className="image" src={data.img} alt={data.title} />
      </div>
      <div className="title">{data.title}</div>
      <div className="description">{data.desc}</div>
      <div className="rating">{data.rating[2].score}</div>
    </div>
  );
};

export default MovieCard;
