import {Router} from "express";
import user_routes from "./routes/user.js";

const router = Router();

router.use(user_routes);

export default router