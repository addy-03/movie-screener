const http = require("http");
const fs = require("fs");
const Movies = require("./controller/moviesController");

const moviesDataFile = "./data/moviesData.json";

const PORT = process.env.PORT || 5000;

const reqHeadSuccess = { "Content-Type": "application/json" };

const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", ["GET", "PATCH", "OPTIONS"]);
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Set the request route
  if (req.url === "/api" && req.method === "GET") {
    console.log("/api");
    res.writeHead(200, reqHeadSuccess);
    res.write("This is Movie Screener API");
    res.end();
  }
  //Send success on Options preflight
  else if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }
  // GET all the movies
  else if (req.url === "/movies" && req.method === "GET") {
    console.log("/movies");
    const movies = await new Movies().getAllMovies();
    res.writeHead(200, reqHeadSuccess);
    res.end(JSON.stringify(movies));
  }
  // GET Labels
  else if (req.url === "/movies/labels" && req.method === "GET") {
    console.log("/movies/labels");
    const labels = await new Movies().getMovieLabels();
    res.writeHead(200, reqHeadSuccess);
    res.end(JSON.stringify(labels));
  }
  // Update shortlist status of movie
  else if (
    req.url.match(/^\/movies\/shortlist\/[\w(%20)+]+$/) &&
    req.method === "PATCH"
  ) {
    console.log(req.url);
    const id = req.url.split("/")[3].replace("%20", " ");
    console.log("id", id);

    new Movies()
      .updateShortlistStatus(id)
      .then((movie) => {
        res.writeHead(200, reqHeadSuccess);
        res.end(JSON.stringify({ movie }));
        console.log("updated movie");
      })
      .catch((error) => {
        console.log("catch updated movie");
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Movie not found" }));
      });
  }
  // GET Movies on Label filter
  else if (
    req.url.match(/\/movies\?filter=[\w(%20)+]+$/) &&
    req.method === "GET"
  ) {
    console.log(req.url);
    const label = req.url.split("=")[1].replace("%20", " ");
    console.log(label);
    const filteredData = await new Movies().getMoviesByLabel(label);
    res.writeHead(200, reqHeadSuccess);
    res.end(JSON.stringify(filteredData));
  }
  // If no route present
  else {
    console.log(req.url);
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
