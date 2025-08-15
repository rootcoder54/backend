import prisma from "../config/prisma";

export const getCategories = async () => {
  return prisma.categorie.findMany({
    include: {
      produits: true,
      shop: true
    }
  });
};

export const getCategorieById = async (id: string) => {
  return prisma.categorie.findUnique({
    where: { id: id },
    include: {
      produits: true,
      shop: true
    }
  });
};
export const addCategorie = async (
  nom: string,
  description: string,
  image: string,
  shopId: string
) => {
  return prisma.categorie.create({
    data: {
      nom,
      description,
      image,
      shopId
    }
  });
};
export const updateCategorie = async (
  id: string,
  nom: string,
  description: string,
  image: string,
  shopId: string
) => {
  return prisma.categorie.update({
    where: { id },
    data: {
      nom,
      description,
      image,
      shopId
    }
  });
};

export const deleteCategorie = async (id: string) => {
  return prisma.categorie.delete({
    where: { id }
  });
};
