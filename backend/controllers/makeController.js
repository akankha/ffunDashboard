import { Make } from "../models/Make.js";

export const getmakers = async (req, res) => {
  try {
    const makers = await Make.findAll(); // Use a different variable name here
    res.json(makers);
  } catch (error) {
    console.error("Error fetching Maker:", error);
    res.status(500).json({ error: "Database error" });
  }
};
