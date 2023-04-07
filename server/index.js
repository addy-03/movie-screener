const http = require("http");
const fs = require("fs");

const PORT = process.env.PORT || 5000;

const reqHeadSuccess = { "Content-Type": "application/json" };
const moviesDataFile = "./Data/movies.json";

const server = http.createServer(async (req, res) => {
  // Set the request route
  if (req.url === "/api" && req.method === "GET") {
    res.writeHead(200, reqHeadSuccess);
    res.write("This is Movie Screener API");
    res.end();
  }
  // Get all the movies
  else if (req.url === "/movies" && req.method === "GET") {
    fs.readFile(moviesDataFile, "utf-8", (error, data) => {
      if (error) {
        // set the status code and content-type
        res.writeHead(404, { "Content-Type": "application/json" });
        // send the error
        res.end(JSON.stringify({ message: error.message }));
      } else {
        res.writeHead(200, reqHeadSuccess);
        res.end(data);
      }
    });
  }
  // Auxiliary Data
  else if (req.url === "/movies/labels" && req.method === "GET") {
    fs.readFile(moviesDataFile, "utf-8", (error, data) => {
      if (error) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: error.message }));
      } else {
        res.writeHead(200, reqHeadSuccess);

        data = JSON.parse(data);
        let labels = new Set();

        data.movies.forEach((element) => {
          labels.add(element.label);
        });

        labels = [...labels];
        res.end(JSON.stringify(labels));
      }
    });
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
