import express from "express";
import v1Router from "./routes/v1/index";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("api/v1", v1Router);

app.listen(PORT, () => {
  console.log("HTTP Backend Working", PORT);
});
