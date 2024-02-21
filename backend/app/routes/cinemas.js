import { Router } from "express";
// import prisma from "../prisma.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = new Router();

// Get all cinemas
router.get("/cinemas", async (req, res) => {
  try {
    const cinemas = await prisma.cinema.findMany();
    res.json(cinemas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get cinema by ID
router.get("/cinemas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cinema = await prisma.cinema.findUnique({
      where: { id: parseInt(id) },
    });
    res.json(cinema);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add new cinema
router.post("/cinemas", async (req, res) => {
  const { name, address, lat, long } = req.body;
  try {
    const newCinema = await prisma.cinema.create({
      data: {
        name,
        address,
        lat,
        long,
      },
    });
    res.json(newCinema);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update cinema by ID
router.put("/cinemas/:id", async (req, res) => {
  const { id } = req.params;
  const { name, address, lat, long } = req.body;
  try {
    const updatedCinema = await prisma.cinema.update({
      where: { id: parseInt(id) },
      data: {
        name,
        address,
        lat,
        long,
      },
    });
    res.json(updatedCinema);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// // Delete cinema by ID
router.delete("/cinemas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.cinema.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Cinema deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
