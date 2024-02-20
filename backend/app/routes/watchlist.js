import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.post("/watchlist", async (req, res) => {
  try {
    const { user_id, movie_id } = req.body;

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

router.get("/watchlist", async (req, res) => {
  try {
    const watchlistItems = await prisma.watchlist.findMany();
    res.json(watchlistItems);
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    res.status(500).json({ error: "Failed to fetch watchlist" });
  }
});

export default router;
