import express from "express";
import { productRouter } from "./routes/productRoutes";

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(express.json());
app.use("/api", productRouter);

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
