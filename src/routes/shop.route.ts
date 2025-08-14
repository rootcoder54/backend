/*
const auth = require('../middleware/auth');

*/

import { Router } from "express";
import {
  createShop,
  deleteShop,
  getAllShop,
  getShopById,
  updateShop
} from "../services/shop.service";

//router.use(auth);
const shopRouter = Router();

shopRouter.get("/", async (req, res) => {
  const shops = await getAllShop();
  console.log(shops);
  res.json(shops);
});

shopRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const shops = await getShopById(id);
  console.log(shops);
  res.json(shops);
});

shopRouter.post("/", async (req, res) => {
  const { name, description, adresse, telephone, email, website, logo } =
    req.body;
  const shop = await createShop(
    name,
    description,
    adresse,
    telephone,
    email,
    website,
    logo
  );
  console.log(shop);
  res.json(shop);
});

shopRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, adresse, telephone, email, website, logo } =
    req.body;
  const shop = await updateShop(
    id,
    name,
    description,
    adresse,
    telephone,
    email,
    website,
    logo
  );
  console.log(shop);
  res.json(shop);
});

shopRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const shop = await deleteShop(id);
  console.log(shop);
  res.json({ message: "Shop supprimé", shop });
});

export default shopRouter;
