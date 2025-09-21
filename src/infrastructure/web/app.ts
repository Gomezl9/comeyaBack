import express,{Response, Request} from "express";
import userRoutes from "../routes/UserRoutes";
import roleRoutes from "../routes/RoleRoutes";
import donacionDineroRoutes from "../routes/DonacionDineroRoutes";
import donacionInventarioRoutes from "../routes/DonacionInventarioRoutes";
import servicioRoutes from "../routes/ServicioRoutes";
import comedorRoutes from "../routes/ComedorRoutes";
import inventarioRoutes from "../routes/InventarioRoutes";
import reservaRoutes from "../routes/ReservaRoutes";

class App{
    private app!: express.Application;

    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
    }
    private middleware(): void {
    this.app.use(express.json());
}
private routes(): void {
    this.app.use("/api", userRoutes);
    this.app.use("/api", roleRoutes);
    this.app.use("/api", donacionDineroRoutes);
    this.app.use("/api", donacionInventarioRoutes);
    this.app.use("/api", servicioRoutes);
    this.app.use("/api", comedorRoutes);
    this.app.use("/api", inventarioRoutes);
    this.app.use("/api", reservaRoutes);
}
    getApp(){
            return this.app;
        }
    }
export default new App().getApp();