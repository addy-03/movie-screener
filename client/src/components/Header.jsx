import { useContext, useEffect } from "react";
import { MoviesContext } from "../context/moviesContext";

const Header = () => {
  const { data, dispatch } = useContext(MoviesContext);
  const { labels, filterLabel } = data;
  useEffect(() => {
    // fetch("http://localhost:5000/movies", {
    //   method: "GET",
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then(async (res) => {
    //     dispatch({ type: "SET_MOVIES", payload: (await res.json()).movies });
    //     // console.log(await res.json());
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    fetch("http://localhost:5000/movies/labels", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(async (res) => {
        dispatch({ type: "SET_LABELS", payload: (await res.json()).labels });
        // console.log(labels);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchByLabel = () => {
    let apiURL = "";
    if (filterLabel === "") {
      apiURL = "http://localhost:5000/movies";
    } else {
      apiURL = "http://localhost:5000/movies?filter=" + filterLabel;
    }

    fetch(apiURL, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(async (res) => {
        dispatch({ type: "SET_MOVIES", payload: (await res.json()).movies });
        // console.log(await res.json());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchByLabel();
  }, [filterLabel]);

  const filterByLabel = (e, label) => {
    dispatch({ type: "SET_FILTER_LABEL", payload: label });

    const menuEl = document.getElementById("menu");
    if (menuEl.style.display === "none") {
      menuEl.style.display = "block";
    } else menuEl.style.display = "none";
  };

  const handleOnFilter = () => {
    const menuEl = document.getElementById("menu");
    if (menuEl.style.display === "none") {
      menuEl.style.display = "block";
    } else menuEl.style.display = "none";
  };

  const clearFilters = () => {
    dispatch({ type: "SET_FILTER_LABEL", payload: "" });
  };

  return (
    <div className="header">
      <h1 className="brand">Movie Screener</h1>
      <div className="filter">
        <div className="filter-label" onClick={handleOnFilter}>
          {filterLabel === "" ? "Filter" : filterLabel}
        </div>
        <ul id="menu" className="menu">
          {labels?.length !== 0 &&
            labels?.map((label) => (
              <li
                key={label}
                className="item"
                onClick={(e) => filterByLabel(e, label)}
              >
                {label}
              </li>
            ))}
        </ul>
      </div>
      <div className="clear-filter" onClick={clearFilters}>
        Clear
      </div>
    </div>
  );
};

export default Header;
