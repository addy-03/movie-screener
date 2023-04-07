const http = require("http");
const fs = require("fs");
const Movies = require("./controller/moviesController");

const PORT = process.env.PORT || 5000;

const reqHeadSuccess = { "Content-Type": "application/json" };

const server = http.createServer(async (req, res) => {
  // Set the request route
  if (req.url === "/api" && req.method === "GET") {
    res.writeHead(200, reqHeadSuccess);
    res.write("This is Movie Screener API");
    res.end();
  }
  // GET all the movies
  else if (req.url === "/movies" && req.method === "GET") {
    const movies = await new Movies().getAllMovies();
    res.writeHead(200, reqHeadSuccess);
    res.end(JSON.stringify(movies));
  }
  // GET Labels
  else if (req.url === "/movies/labels" && req.method === "GET") {
    const labels = await new Movies().getMovieLabels();
    res.writeHead(200, reqHeadSuccess);
    res.end(JSON.stringify(labels));
  }
  // Update shortlist status of movie
  else if (
    req.url.match(/^\/movies\/shortlist\/[\w(%20)+]+$/) &&
    req.method === "PATCH"
  ) {
    fs.readFile(moviesDataFile, "utf-8", (error, data) => {
      if (error) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: error.message }));
      } else {
        res.writeHead(200, reqHeadSuccess);
        res.end("reuest " + req.url);
        console.log(req.url);
      }
    });
  }
  // GET Movies on Label filter
  else if (
    req.url.match(/\/movies\?filter=[\w(%20)+]+$/) &&
    req.method === "GET"
  ) {
    const label = req.url.split("=")[1].replace("%20", " ");
    console.log(label);
    const filteredData = await new Movies().getMoviesByLabel(label);
    res.writeHead(200, reqHeadSuccess);
    res.end(JSON.stringify(filteredData));
  }
  // If no route present
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
