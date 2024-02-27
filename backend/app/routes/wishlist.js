import { Router } from "express";
import prisma from "../prisma.js";
import authToken from "../middlewares/auth-token.js";
import cors from "cors";

const router = Router();
router.use(cors());

router.post("/check-favorite",authToken, async (req, res) => {
  // return res.json({ message: "response for req check favorite" });
  // return res.json({ message: req.headers });
  // return res.json({ check_favorite: req });
  const { user_id, movie_id } = req.body;
  // return res.json(req.body);
  try {

    const isFavoriteMovie = await prisma.wishlist.findFirst({
      where: {
        user_id: Number(user_id),
        movie_id: Number(movie_id),
      }
    })

    if (isFavoriteMovie !== null) {
      return res.status(200).json({ check_favorite: "favorite movie", isFavoriteMovie: isFavoriteMovie });
    }
  } catch (error) {
    //   return res.status(404).json({ check_favorite: "not found" });
    return res.status(500).json({ check_favorite: "not found" });
  }
});


router.get("/user-favorite", authToken, async (req, res) => {
  const { user_id } = req.body;
  const favoriteMovies = await prisma.wishlist.findMany({
    where: {
      user_id: Number(user_id),
    },
  });
  return res.status(200).json(favoriteMovies);
});

router.post("/add-to-favorite", authToken, async (req, res) => {
  const { user_id, movie_id } = req.body;
  try {
    const favoriteItem = await prisma.wishlist.create({
      data: {
        user_id: Number(user_id),
        movie_id: Number(movie_id),
      },
    });
    return res.status(200).json({ message: "added to favorite" });
    // res.json(favoriteItem);
  } catch (error) {
    console.error("Error adding movie to favorite:", error);
    return res.status(500).json({ error: "Failed to add movie to favorite" });
  }
});

router.delete("/remove-from-favorite", authToken, async (req, res) => {
  const { user_id, movie_id } = req.body;
  try {
    const favoriteMovies = await prisma.wishlist.deleteMany({
      where: {
        user_id: Number(user_id),
        movie_id: Number(movie_id),
      },
    });

    res.status(200).json({ message: "Deleted from favorites" });
  } catch (error) {
    console.error("Error removing movie from favorites:", error);
    // Handle error appropriately
  }
});



export default router;
