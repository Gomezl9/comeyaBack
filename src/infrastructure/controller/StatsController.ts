import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { ComedorAdpartes } from "../adapter/ComedorAdapter";
import { DonacionDineroAdpartes } from "../adapter/DonacionDineroAdapter";
import { DonacionInventarioAdpartes } from "../adapter/DonacionInventarioAdapter";
import { ReservaAdpartes } from "../adapter/ReservaAdapter";
import { QuickStats } from "../../domain/QuickStats";

export class StatsController {
    constructor(
        private comedorAdapter: ComedorAdpartes,
        private donacionDineroAdapter: DonacionDineroAdpartes,
        private donacionInventarioAdapter: DonacionInventarioAdpartes,
        private reservaAdapter: ReservaAdpartes,
    ) {}

    async getStats(req: AuthRequest, res: Response): Promise<Response> {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "No autenticado" });
        }

        try {
            const userId = user.sub;
            const isAdmin = user.rol_id === 1;

            let stats: QuickStats;

            if (isAdmin) {
                stats = await this.getAdminStats(userId);
            } else {
                stats = await this.getUserStats(userId);
            }

            return res.status(200).json(stats);
        } catch (error) {
            console.error("Error al calcular estadísticas:", error);
            return res.status(500).json({ message: "Error en el servidor al calcular estadísticas" });
        }
    }

    private async getAdminStats(adminId: number): Promise<QuickStats> {
        const comedores = await this.comedorAdapter.findByCreator(adminId);
        const comedorIds = comedores.map(c => c.id);

        const totalDonaciones = await this.donacionDineroAdapter.countByComedores(comedorIds) +
                                await this.donacionInventarioAdapter.countByComedores(comedorIds);
        
        const donacionesRecientes = await this.donacionDineroAdapter.countRecentByComedores(comedorIds) +
                                    await this.donacionInventarioAdapter.countRecentByComedores(comedorIds);

        const totalReservas = await this.reservaAdapter.countByComedores(comedorIds);
        const reservasPendientes = await this.reservaAdapter.countPendientesByComedores(comedorIds);

        return {
            total_comedores: comedores.length,
            comedores_activos: comedores.filter(c => c.activo).length,
            total_donaciones: totalDonaciones,
            total_reservas: totalReservas,
            donaciones_recientes: donacionesRecientes,
            reservas_pendientes: reservasPendientes,
        };
    }

    private async getUserStats(userId: number): Promise<QuickStats> {
        const totalDonaciones = await this.donacionDineroAdapter.countByUser(userId) +
                                await this.donacionInventarioAdapter.countByUser(userId);
        
        const donacionesRecientes = await this.donacionDineroAdapter.countRecentByUser(userId) +
                                    await this.donacionInventarioAdapter.countRecentByUser(userId);

        const totalReservas = await this.reservaAdapter.countByUser(userId);
        const reservasPendientes = await this.reservaAdapter.countPendientesByUser(userId);

        // Para usuarios, las estadísticas de comedores pueden ser globales
        const totalComedores = await this.comedorAdapter.countAll();
        const comedoresActivos = await this.comedorAdapter.countActivos();

        return {
            total_comedores: totalComedores,
            comedores_activos: comedoresActivos,
            total_donaciones: totalDonaciones,
            total_reservas: totalReservas,
            donaciones_recientes: donacionesRecientes,
            reservas_pendientes: reservasPendientes,
        };
    }
}
