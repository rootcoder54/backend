/*
const auth = require('../middleware/auth');

*/

import { Router } from "express";
import multer from "multer";
import authMiddleware from "../middleware/auth";

import {
  addImage,
  deleteImage,
  getImageById,
  getImageByProduit,
  getImages
} from "../services/image.service";

//router.use(auth);
const imageRouter = Router();
imageRouter.use(authMiddleware);

imageRouter.get("/", async (req, res) => {
  const images = await getImages();
  console.log(images);
  res.json(images);
});

imageRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const image = await getImageById(id);
  console.log(image);
  res.json(image);
});

imageRouter.get("/produits/:id", async (req, res) => {
  const { id } = req.params;
  const images = await getImageByProduit(id);
  console.log(images);
  res.json(images);
});

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

imageRouter.post("/", upload.single("image"), async (req, res) => {
  const { produitId } = req.body;
  /*const image = await addImage(url, produitId);
  res.json(image);*/
  try {
    if (!req.file)
      return res.status(400).json({ error: "Aucun fichier envoyé" });

    const image = await addImage(req.file.path, produitId);
    console.log(image);
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'upload" });
  }
});

/*imageRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    nom,
    description,
    prix,
    quantite,
    categorieId,
    fournisseurId,
    shopId
  } = req.body;
  const prixre = parseFloat(prix);
  const qte = parseInt(quantite, 10);
  if (isNaN(prixre) || isNaN(qte)) {
    return res.status(400).json({ error: "Prix ou quantité invalide" });
  }
  const produit = await updateProduit(
    id,
    nom,
    description,
    prixre,
    qte,
    categorieId,
    fournisseurId,
    shopId
  );
  console.log(produit);
  res.json(produit);
});*/

imageRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const image = await deleteImage(id);
  console.log(image);
  res.json({ message: "Produit supprimé", image });
});

export default imageRouter;
