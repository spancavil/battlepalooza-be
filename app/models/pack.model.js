import { Pack } from '../schemas/pack.schema.js';
import logger from "../logger/bunyan.js";

export class PackModel {

    static async findAll() {
        try {
            const packs = await Pack.find({});
            return packs;
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            return { error: error.name, message: error.message };
        }
    }

    static async createPack(data) {
        try {
            const pack = await Pack.create(data);
            return pack
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            return { error: error.name, message: error.message };
        }
    }

    static async findById(id) {
        try {
            const pack = await Pack.findOne({ _id: id });
            return pack
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            return { error: error.name, message: error.message };
        }
    }

    static async updatePack(dataToUpdate, id) {
        try {
            const pack = await Pack.findOneAndUpdate({ _id: id },
                dataToUpdate, {
                new: true
            });
            return pack
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            return { error: error.name, message: error.message };
        }
    }

    static async deleteById(id) {
        try {
            const pack = await Pack.findOneAndDelete({ _id: id });
            return pack
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            return { error: error.name, message: error.message };
        }
    }

    static async
}