import express from "express";
import weatherRoutes from "./routes/weatherRoutes";

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", weatherRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
