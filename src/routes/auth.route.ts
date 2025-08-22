import { Router } from "express";
import { login, register } from "../services/user.service";
import jwt from "jsonwebtoken";

const userRouter = Router();
const SECRET = process.env.JWT_SECRET || "secret_key";

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };
  const result = await login(username, password);
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  const user = result.user;
  const token = jwt.sign({ userId: user.id, user: user }, SECRET, {
    expiresIn: "30d"
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 jours
  });
  res.json({ message: "Connexion réussie", token: token });
});

userRouter.post("/register", async (req, res) => {
  const { firstName, lastName, username, password, roleId, shopId } =
    req.body as {
      firstName: string;
      lastName: string;
      username: string;
      password: string;
      roleId: string;
      shopId: string;
    };
  const result = await register(
    firstName,
    lastName,
    username,
    password,
    roleId,
    shopId
  );
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ user: result.user });
});

userRouter.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });
  res.json({ message: "Déconnecté" });
});

userRouter.get("/profile", (req, res) => {
  /*const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Token requis" });*/
  const token = req.cookies.token;
  if (!token) return res.json({ user: null });
  try {
    const payload = jwt.verify(token, SECRET);
    res.json({ user: payload });
  } catch {
    res.status(401).json({ error: "Token invalide" });
  }
});

export default userRouter;
