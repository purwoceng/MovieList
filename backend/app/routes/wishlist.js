import { Router } from "express";
import prisma from "../prisma.js";
import authToken from "./middlewares/auth-token.js";

const router = Router();

router.post("/wishlist", authToken, async (req, res) => {
  const user_id = req.user.id
  try {
    const {movie_id } = req.body;

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

router.get("/wishlist", authToken, async (req, res) => {

  const user_id = req.user.id
  try {
    const wishlistItems = await prisma.wishlist.findMany({
      where: {
        user_id: Number(user_id),
      }
    });
    res.json(wishlistItems);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
});

export default router;
