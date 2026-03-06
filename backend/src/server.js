  import dotenv from "dotenv";
  dotenv.config();
  import express from "express";
  import cors from "cors";
  import connectDB from "./config/db.js";
  import appointmentRoutes from "./routes/appointmentRoutes.js";
  import dns from "node:dns";

  dns.setServers(["1.1.1.1", "8.8.8.8"]);

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api/appointments", appointmentRoutes);

  app.get("/", (req, res) => {
    res.send("Medical Appointment API Running");
  });

  app.put("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

  const PORT = process.env.PORT || 3001;
  connectDB().then(() =>  {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
  })
