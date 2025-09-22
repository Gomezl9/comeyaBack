import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/data-base";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

import userRoutes from "./routes/UserRoutes";
import comedorRoutes from "./routes/ComedorRoutes";
import roleRoutes from "./routes/RoleRoutes";
import servicioRoutes from "./routes/ServicioRoutes";
import reservaRoutes from "./routes/ReservaRoutes";
import inventarioRoutes from "./routes/InventarioRoutes";
import comedorServicioRoutes from "./routes/ComedorServicioRoutes";
import donaciondineroRoutes from "./routes/DonacionDineroRoutes";
import donacioninventarioRoutes from "./routes/DonacionInventarioRoutes";
import statsRoutes from "./routes/StatsRoutes";

connectDB()
  .then(() => {
    app.use("/api", userRoutes);
    app.use("/api", comedorRoutes);
    app.use("/api", roleRoutes);
    app.use("/api/servicios", servicioRoutes);
    app.use("/api", reservaRoutes);
    app.use("/api", inventarioRoutes);
    app.use("/api", comedorServicioRoutes);
    app.use("/api", donaciondineroRoutes);
    app.use("/api", donacioninventarioRoutes);
    app.use("/api", statsRoutes);

    app.get("/", (req, res) => {
      res.send("API funcionando con arquitectura hexagonal");
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error inicializando la BD:", err);
  });
