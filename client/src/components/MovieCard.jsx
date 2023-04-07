const MovieCard = ({ data }) => {
  return (
    <div className="movie-card">
      <span className={`toggle-btn visible visible-${data.isVisible}`}></span>
      <span
        className={`toggle-btn shortlist shortlist-${data.isShortlisted}`}
      ></span>
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
