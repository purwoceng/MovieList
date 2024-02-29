import { Router } from "express";
// import prisma from "../prisma.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authToken from "../middlewares/auth-token.js";
import cors from "cors";
import { validateRegister, validateLogin } from "../middlewares/validator.js";

const prisma = new PrismaClient();
const router = Router();
router.use(cors());

router.post("/register", async (req, res) => {
  const { name, email, password, image } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existUser) {
    return res.status(400).json({ message: "Email is already in use" });
  }

  const pass = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: pass,
    },
  });
  /* `<<<<<<<` is a version control conflict marker that indicates the beginning of a conflict in the
  code. It is typically used in version control systems like Git to highlight areas where conflicting
  changes have been made by different contributors. In this case, it seems like there was a conflict
  in the code that was not resolved properly, resulting in the presence of the conflict marker
  `<<<<<<< HEAD`. */
  if (!user) return res.status(400).json({ message: "User not created" });

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const expiresIn = 60 * 60 * 24 * 30;
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });

  res.status(201).json({ user, token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email or password is required" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res.status(400).json({ message: "Invalid credential" });
  }
  const validPassword = bcrypt.compareSync(password, user.password);

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const expiresIn = 60 * 60 * 24 * 30;
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });

  if (!validPassword) {
    return res.status(400).json({ message: "Invalid credential" });
  }

  return res
    .status(200)
    .json({ message: "Login successful", user: user, token: token });
});

router.get("/users", async (req, res) => {
  const user_id = req.user.id;

  const user = await prisma.user.findFirst({
    where: {
      id: Number(user_id),
    },
  });
  res.json(user);
});

router.get("/profile", authToken, async (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: "Token is required" });
  }

  const user_id = req.user.id;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(user_id),
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/profile", async (req, res) => {
  try {
    // if (!req.user) {
    //   return res.status(401).json({ error: "Token is required" });
    // }

    const { name, email, password } = req.body;
    const user_id = Number(req.user.id);

    if (isNaN(user_id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    if (!password) {
      const updatedUser = await prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          name,
          email,
        },
      });
      return res.json(updatedUser);
    }

    const pass = await bcrypt.hash(password, 12);

    const updatedUser = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        name,
        email,
        password: pass,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({ error: "Failed to update user profile" });
  }
});

export default router;
