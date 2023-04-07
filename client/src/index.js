import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MoviesContextProvider } from "./context/moviesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MoviesContextProvider>
      <App />
    </MoviesContextProvider>
  </React.StrictMode>
);
