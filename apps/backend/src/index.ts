import express from "express";
import v1Router from "./routes/v1/index";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/v1", v1Router);

// Only start server if not in serverless environment
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log("HTTP Backend Working", PORT);
  });
}

// Export for Vercel serverless
export default app;
