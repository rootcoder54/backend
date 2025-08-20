import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import shopRouter from "./routes/shop.route";
import userRouter from "./routes/auth.route";
import clientRouter from "./routes/client.route";
import fournisseurRouter from "./routes/fournisseur.route";
import categorieRouter from "./routes/categorie.route";
import produitRouter from "./routes/produit.route";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:80", // Frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

app.use("/api/shops", shopRouter);
app.use("/api/clients", clientRouter);
app.use("/api/fournisseurs", fournisseurRouter);
app.use("/api/categories", categorieRouter);
app.use("/api/produits", produitRouter);
app.use("/api/auth", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
