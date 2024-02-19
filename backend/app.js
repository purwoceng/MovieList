import express from "express";
import router from "./app/router.js";
import cinemas from "./app/routes/cinemas.js"

const app = express();
app.use(express.json());
app.use(router);
app.use(cinemas);

export default app;
