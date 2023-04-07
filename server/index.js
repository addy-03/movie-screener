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
    res.writeHead(200, reqHeadSuccess);
    fs.readFile(moviesDataFile, "utf-8", (err, data) => {
      console.log(data);
      res.end(data);
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
