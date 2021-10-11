import { PackService } from '../services/index.js';
import logger from "../logger/bunyan.js";

export class PackController {

    static async packRegistration(req, res, next) {

        try {
            const data = await PackService.createPack(req.body);
            res.json({ success: true, data })
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`)
            res.status(error.status || 500).json({ error: error.name, message: error.message });
            next(error);
        }
    }

    static async findOnePack(req, res, next) {

        const { id } = req.query;

        try {
            const data = await PackService.findPackById(id);
            res.json({ success: true, data })
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`)
            res.status(error.status || 500).json({ error: error.name, message: error.message });
            next(error);
        }
    }

    static async findAllPacks(req, res, next) {

        try {            
            const data = await PackService.findAllPacks();
            res.json({ success: true, data })
        } catch (error) {
            logger.error(`Error en findAll de Pack Controller: ${error.name} ${error.message}`)
            res.status(error.status || 500).json({ error: error.name, message: error.message });
            next(error);
        }
    }

    static async updatePack(req, res, next) {

        const { id } = req.query;
        try {
            const data = await PackService.updatePackData(req.body, id)
            res.json({ success: true, data })
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
            next(error);
        }
    }

    static async deletePack(req, res, next) {

        const { id } = req.query;
        try {
            const data = await PackService.deletePack(id)
            res.json({ success: true, data })
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
            next(error);
        }
    }
}
