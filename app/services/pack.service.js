import { PackModel } from '../models/index.js';
import logger from '../logger/bunyan.js';

export class PackService {

    static async createPack(data) {
        try {
            const pack = await PackModel.createPack(data);
            return { message: `pack created, thanks` };
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`)
            return { error: error.name, message: error.message };
        }
    }

    static async findPackById(id) {
        try {
            const pack = await PackModel.findById(id);
            return pack;
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`)
            return { error: error.name, message: error.message };
        }
    }

    static async findAllPacks() {
        try {
            const packs = await PackModel.findAll();
            return packs;
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`)
            return { error: error.name, message: error.message };
        }
    }

    static async updatePackData(data, id) {

        try {
            const pack = await PackModel.updatePack(data, id);
            return pack;
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            return { error: error.name, message: error.message };
        }
    }

    static async deletePack(id) {

        try {
            const pack = await PackModel.deleteById(id);
            return pack;
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            return { error: error.name, message: error.message };
        }
    }
}
