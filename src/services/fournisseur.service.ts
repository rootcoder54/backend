import prisma from "../config/prisma";

export const getFournisseurs = async () => {
  return prisma.fournisseur.findMany({
    include: {
      shop: true,
      adresse: true,
      produits: true
    }
  });
};

export const getFournisseurById = async (id: string) => {
  return prisma.fournisseur.findUnique({
    where: { id: id },
    include: {
      shop: true,
      adresse: true,
      produits: true
    }
  });
};
export const createFournisseur = async (
  nom: string,
  email: string,
  telephone: string,
  adresse: string,
  shopId: string
) => {
  return prisma.fournisseur.create({
    data: {
      nom,
      email,
      telephone,
      adresseId: adresse,
      shopId
    }
  });
};
export const updateFournisseur = async (
  id: string,
  nom: string,
  email: string,
  telephone: string,
  adresse: string,
  shopId: string
) => {
  return prisma.fournisseur.update({
    where: { id },
    data: {
      nom,
      email,
      telephone,
      adresseId: adresse,
      shopId
    }
  });
};

export const deleteFournisseur = async (id: string) => {
  return prisma.fournisseur.delete({
    where: { id }
  });
};
