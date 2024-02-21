import { Router } from "express";
import user_routes from "./routes/user.js";
import cinemas from "./routes/cinemas.js";
import movie_routes from "./routes/movie.js";
import wishlist from "./routes/wishlist.js";
import watchlist from "./routes/watchlist.js";

const router = Router();

router.use(user_routes);
router.use(cinemas);
router.use(movie_routes);
router.use(wishlist);
router.use(watchlist);

export default router;
