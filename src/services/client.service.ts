import prisma from "../config/prisma";

export const getAllClients = async () => {
  return prisma.client.findMany({
    include: {
      shop: true,
      commandes: true,
      adresse: true
    }
  });
};

export const getClientById = async (id: string) => {
  return prisma.client.findUnique({
    where: { id: id },
    include: {
      shop: true,
      commandes: true,
      adresse: true
    }
  });
};
export const createClient = async (
  nom: string,
  email: string,
  telephone: string,
  adresse: string,
  shopId: string
) => {
  return prisma.client.create({
    data: {
      nom,
      email,
      telephone,
      adresseId: adresse,
      shopId
    }
  });
};
export const updateClient = async (
  id: string,
  nom: string,
  email: string,
  telephone: string,
  adresse: string,
  shopId: string
) => {
  return prisma.client.update({
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

export const deleteClient = async (id: string) => {
  return prisma.client.delete({
    where: { id }
  });
};
