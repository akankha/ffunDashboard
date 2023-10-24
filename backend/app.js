// src/app.js
import express from "express";
import cors from "cors";

import vehicleRoutes from "./routes/vehicleRoutes.js";
import vehicleModelRoutes from "./routes/vehicleModelRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import makeRoutes from "./routes/makeRoute.js";

// import vehicleRoutes from "";

const app = express();
const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

// Set up your routes
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/vehicleModel", vehicleModelRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/makers", makeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
