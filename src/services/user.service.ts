import bcrypt from "bcryptjs";
import prisma from "../config/prisma";

export const login = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { username }
  });
  if (!user) return { error: "Utilisateur introuvable" };
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return { error: "Mot de passe incorrect" };
  delete user.password;
  return { user };
};

export const register = async (
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  roleId: string,
  shopId: string
) => {
  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) return { error: "Nom d'utilisateur déjà pris" };

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      firstName,
      lastName,
      roleId,
      shopId
    }
  });
  return { user };
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      telephone: true,
      firstName: true,
      lastName: true,
      roleId: true,
      shopId: true
    }
  });
};
