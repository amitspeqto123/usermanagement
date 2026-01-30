import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { databaseConnection } from "./config/db.js";


const PORT = process.env.PORT || 3000;

// Connect to DB first
databaseConnection();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
