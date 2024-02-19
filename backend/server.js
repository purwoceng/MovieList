import { config } from "dotenv";
import app from "./app.js";

config();

const port = process.env.APP_PORT || 5000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
