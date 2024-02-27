import { Router } from "express";
import cinemas from "./routes/cinemas.js";
import movie_routes from "./routes/movie.js";
import user_routes from "./routes/user.js";
import watchlist from "./routes/watchlist.js";
import wishlist from "./routes/wishlist.js";

const router = Router();

router.use(cinemas);
router.use(movie_routes);
router.use(user_routes);
router.use(watchlist);
router.use(wishlist);

export default router;
