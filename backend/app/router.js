import { Router } from "express";
import user_routes from "./routes/user.js";
import cinemas from "./app/routes/cinemas.js";
import movie_routes from "./routes/movie.js";

const router = Router();

router.use(user_routes);
router.use(cinemas);
router.use(movie_routes);

export default router;
