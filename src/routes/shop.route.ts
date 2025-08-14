/*
const auth = require('../middleware/auth');

*/

import { Router } from "express";
import prisma from "../config/prisma";

//router.use(auth);
const shopRouter = Router();

shopRouter.get('/', async (req, res) => {
  const shops = await prisma.shop.findMany({
    include: {
      users: true,
      clients: true,
      commandes: true,
      fournisseurs: true,
      categories: true,
      mouvements: true,
      produits: true,
      adresse: true,
    },
  });
  console.log(shops);
  res.json(shops);
});

shopRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const shops = await prisma.shop.findUnique({
    where: { id: id },
    include: {
      users: true,
      clients: true,
      commandes: true,
      fournisseurs: true,
      categories: true,
      mouvements: true,
      produits: true,
      adresse: true,
    },
  });
  console.log(shops);
  res.json(shops);
});

shopRouter.post('/', async (req, res) => {
  const { name, description, adresse,telephone,email,website,logo } = req.body;
  const shop = await prisma.shop.create({
    data: {
      name,
      description,
      adresseId: adresse,
      telephone,
      email,
      website,
      logo
    }
  });
  console.log(shop);
  res.json(shop);
});

shopRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, adresse,telephone,email,website,logo } = req.body;
  const shop = await prisma.shop.update({
    where: { id: id },
    data: {
      name,
      description,
      adresseId: adresse,
      telephone,
      email,
      website,
      logo
    },
  });
  console.log(shop);
  res.json(shop);
});

shopRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const shop=await prisma.shop.delete({ where: { id: id } });
  console.log(shop);
  res.json({ message: 'Shop supprimé', shop });
});

export default shopRouter;