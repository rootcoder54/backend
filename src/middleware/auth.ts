import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret_key";

/*const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token requis" });

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Token invalide" });
  }
};*/
const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token)
    return res.status(401).json({ error: "Authentification requise" });

  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Token invalide" });
  }
};

export default authMiddleware;
