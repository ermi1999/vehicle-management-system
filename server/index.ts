import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Fetch all vehicles
app.get("/vehicles", async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
});

// Add a new vehicle
app.post("/vehicles", async (req, res) => {
  const { name, status } = req.body;
  try {
    const newVehicle = await prisma.vehicle.create({
      data: { name, status },
    });
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ error: "Failed to add vehicle" });
  }
});

// Update vehicle status
app.put("/vehicles/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedVehicle = await prisma.vehicle.update({
      where: { id },
      data: { status },
    });
    res.json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ error: "Failed to update vehicle" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
