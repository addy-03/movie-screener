import { createContext, useReducer } from "react";

export const MoviesContext = createContext();
export const MoviesContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    movies: {},
    labels: [],
    filterLabel: "",
  };

  const moviesReducer = (state, action) => {
    switch (action.type) {
      case "SET_MOVIES":
        console.log("set movies", action.payload);
        return { ...state, movies: action.payload };
      case "SET_LABELS":
        console.log("set labels", action.payload);
        return { ...state, labels: action.payload };
      case "SET_FILTER_LABEL":
        console.log("set filter labels", action.payload);
        return { ...state, filterLabel: action.payload };
      default:
        return state;
    }
  };
  const [data, dispatch] = useReducer(moviesReducer, INITIAL_STATE);

  return (
    <MoviesContext.Provider value={{ data, dispatch }}>
      {children}
    </MoviesContext.Provider>
  );
};
