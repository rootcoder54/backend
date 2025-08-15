import prisma from "../config/prisma";

export const getProduits = async () => {
  return prisma.produit.findMany({
    include: {
      shop: true,
      categorie: true,
      fournisseur: true,
      images: true,
      commande: true,
      mouvements: true
    }
  });
};

export const getProduitById = async (id: string) => {
  return prisma.produit.findUnique({
    where: { id: id },
    include: {
      shop: true,
      categorie: true,
      fournisseur: true,
      images: true,
      commande: true,
      mouvements: true
    }
  });
};
export const addProduit = async (
  nom: string,
  description: string,
  prix: number,
  quantite: number,
  categorieId: string,
  fournisseurId: string,
  shopId: string
) => {
  return prisma.produit.create({
    data: {
      nom,
      description,
      prix,
      quantite,
      categorieId,
      fournisseurId,
      shopId
    }
  });
};
export const updateProduit = async (
  id: string,
  nom: string,
  description: string,
  prix: number,
  quantite: number,
  categorieId: string,
  fournisseurId: string,
  shopId: string
) => {
  return prisma.produit.update({
    where: { id },
    data: {
      nom,
      description,
      prix,
      quantite,
      categorieId,
      fournisseurId,
      shopId
    }
  });
};

export const deleteProduit = async (id: string) => {
  return prisma.produit.delete({
    where: { id }
  });
};
