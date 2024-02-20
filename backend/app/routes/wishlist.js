import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.post("/wishlist", async (req, res) => {
  try {
    const { user_id, movie_id } = req.body;

    // Menambahkan film ke wishlist
    const wishlistItem = await prisma.wishlist.create({
      data: {
        user_id,
        movie_id,
      },
    });

    res.json(wishlistItem);
  } catch (error) {
    console.error("Error adding movie to wishlist:", error);
    res.status(500).json({ error: "Failed to add movie to wishlist" });
  }
});

router.get("/wishlist", async (req, res) => {
  try {
    const wishlistItems = await prisma.wishlist.findMany();
    res.json(wishlistItems);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
});

export default router;
