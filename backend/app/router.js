import { Router } from "express";
import user_routes from "./routes/user.js";
import movie_routes from "./routes/movie.js";

const router = Router();

router.use(user_routes);
router.use(movie_routes);

export default router;
