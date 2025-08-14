import prisma from "../config/prisma";

export const getAllShop = async () => {
  return prisma.shop.findMany({
    include: {
      users: true,
      clients: true,
      commandes: true,
      fournisseurs: true,
      categories: true,
      mouvements: true,
      produits: true,
      adresse: true
    }
  });
};

export const getShopById = async (id: string) => {
  return prisma.shop.findUnique({
    where: { id: id },
    include: {
      users: true,
      clients: true,
      commandes: true,
      fournisseurs: true,
      categories: true,
      mouvements: true,
      produits: true,
      adresse: true
    }
  });
};
export const createShop = async (
  name: string,
  description: string,
  adresse: string,
  telephone: string,
  email: string,
  website: string,
  logo: string
) => {
  return prisma.shop.create({
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
};
export const updateShop = async (
  id: string,
  name: string,
  description: string,
  adresse: string,
  telephone: string,
  email: string,
  website: string,
  logo: string
) => {
  return prisma.shop.update({
    where: { id },
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
};

export const deleteShop = async (id: string) => {
  return prisma.shop.delete({
    where: { id }
  });
};
