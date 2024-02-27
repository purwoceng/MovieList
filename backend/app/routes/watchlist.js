import { Router } from "express";
import prisma from "../prisma.js";
import authToken from "../middlewares/auth-token.js";

const router = Router();

// router.post("/watchlist", authToken, async (req, res) => {
//   const user_id = req.user.id;

//   try {
//     const {movie_id } = req.body;

//     // Menambahkan film ke watchlist
//     const watchlistItem = await prisma.watchlist.create({
//       data: {
//         user_id,
//         movie_id,
//       },
//     });

//     res.json(watchlistItem);
//   } catch (error) {
//     console.error("Error adding movie to watchlist:", error);
//     res.status(500).json({ error: "Failed to add movie to watchlist" });
//   }
// });

// router.get("/watchlist", authToken, async (req, res) => {

//   const user_id = req.user.id;
//   try {
//     const watchlistItems = await prisma.watchlist.findMany({
//       where: {
//         user_id: Number(user_id),
//       }
//     });
//     res.json(watchlistItems);
//   } catch (error) {
//     console.error("Error fetching watchlist:", error);
//     res.status(500).json({ error: "Failed to fetch watchlist" });
//   }
// });


router.post("/add-to-watchlist", authToken, async (req, res) => {
  const { user_id, movie_id } = req.body;
  try {
    const { movie_id } = req.body;

    // Menambahkan film ke watchlist
    const watchlistItem = await prisma.watchlist.create({
      data: {
        user_id: Number(user_id),
        movie_id: Number(movie_id),
      },
    });
    return res.status(200).json({ message: "added to watchlist" });
    // res.json(favoriteItem);
  } catch (error) {
    console.error("Error adding movie to favorite:", error);
    return res.status(500).json({ error: "Failed to add movie to favorite" });
  }
});


router.get("/watchlist", authToken, async (req, res) => {
  const user_id = req.user.id;
  try {
    const watchlistItems = await prisma.watchlist.findMany({
      where: {
        user_id: Number(user_id),
      },
    });
    res.json(watchlistItems);
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    res.status(500).json({ error: "Failed to fetch watchlist" });
  }
});

router.get(
  "/check-watchlist/:user_id/:movie_id",
  authToken,
  async (req, res) => {
    const user_id = req.params.user_id;
    const movie_id = req.params.movie_id;

    try {
      const response = await prisma.watchlist.findMany({
        where: {
          user_id: Number(user_id),
          movie_id: Number(movie_id),
        },
      });

      if (response.length > 0) {
        // Jika data ditemukan dalam watchlist
        res.json({
          exists: true,
        });
      } else {
        // Jika data tidak ditemukan dalam watchlist
        res.json({
          exists: false,
        });
      }
    } catch (error) {
      console.error("Error checking watchlist:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router
