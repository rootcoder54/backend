import { Shop } from "@prisma/client";
import prisma from "../config/prisma.js";

export const getAllShop = async () => {
  return prisma.shop.findMany();
};

export const getShopById = async (id: string) => {
  return prisma.shop.findUnique({
    where: { id }
  });
};
export const createShop = async (shop: Shop) => {
  return prisma.shop.create({
    data: shop
  });
};
export const updateShop = async (id: string, shop: Partial<Shop>) => {
  return prisma.shop.update({
    where: { id },
    data: shop
  });
};

export const deleteShop = async (id: string) => {
  return prisma.shop.delete({
    where: { id }
  });
};
