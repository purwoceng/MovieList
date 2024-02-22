import { Router } from "express";
import prisma from "../prisma.js";
import authToken from "../middlewares/auth-token.js";

const router = Router();

router.post("/watchlist", authToken, async (req, res) => {
  
  const user_id = req.user.id

  try {
    const {movie_id } = req.body;

    // Menambahkan film ke watchlist
    const watchlistItem = await prisma.watchlist.create({
      data: {
        user_id,
        movie_id,
      },
    });

    res.json(watchlistItem);
  } catch (error) {
    console.error("Error adding movie to watchlist:", error);
    res.status(500).json({ error: "Failed to add movie to watchlist" });
  }
});

router.get("/watchlist", authToken, async (req, res) => {

  const user_id = req.user.id;
  try {
    const watchlistItems = await prisma.watchlist.findMany({
      where: {
        user_id: Number(user_id),
      }
    });
    res.json(watchlistItems);
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    res.status(500).json({ error: "Failed to fetch watchlist" });
  }
});

export default router;
