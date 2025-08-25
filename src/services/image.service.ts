import prisma from "../config/prisma";

export const getImages = async () => {
  return prisma.image.findMany();
};

export const getImageById = async (id: string) => {
  return prisma.image.findUnique({
    where: { id: id }
  });
};
export const addImage = async (url: string, produitId: string) => {
  return prisma.image.create({
    data: {
      url,
      produitId
    }
  });
};
export const updateImage = async (
  id: string,
  url: string,
  produitId: string
) => {
  return prisma.image.update({
    where: { id },
    data: {
      url,
      produitId
    }
  });
};

export const deleteImage = async (id: string) => {
  return prisma.image.delete({
    where: { id }
  });
};
