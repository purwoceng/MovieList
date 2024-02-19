import {Router} from "express";
import user_routes from "./routes/user.js";
import cinemas from "./app/routes/cinemas.js";

const router = Router();

router.use(user_routes);
router.use(cinemas);

export default router