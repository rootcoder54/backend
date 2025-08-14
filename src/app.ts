import express from "express";
import shopRouter from "./routes/shop.route";
import userRouter from "./routes/auth.route";

const app = express();
app.use(express.json());

app.use("/api/shops", shopRouter);
app.use("/api/auth", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
