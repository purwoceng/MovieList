import fetch from "node-fetch";
import { Router } from "express";

const router = Router();

router.get("/movie", (req, res) => {
  const url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&region=Indonesia";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTQxMDRmNTkyOWZlN2E1ODExOGMzMzI0NmM4YjA1ZiIsInN1YiI6IjY1Y2YwMTE2NmQxYmIyMDE3YjRjNzI3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.03s-n84YsW0Md1LkWTb-ByxdAafxJxv9r4iR4SaVtfQ",
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      res.send(response.results);
    });
});

export default router;
