import fetch from "node-fetch";
import { Router } from "express";
import cors from "cors";

const router = Router();
router.use(cors());

router.get("/movie", async (req, res) => {
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

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return res.send(data.results);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

export default router;

