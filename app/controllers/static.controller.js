import logger from "../logger/bunyan.js";
import axios from 'axios';
import config from '../config/index.js';

export class StaticController {
    static async getNftData(req, res) {
        try {
            const response = await axios.get(config.staticUrls.nftIdUrl);
            return res.json(response.data);
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        }
    }

    static async getClans(req, res) {
        try {
            const response = await axios.get(config.staticUrls.clanUrl);
            return res.json(response.data);
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        }
    }

    static async getRarity(req, res) {
        try {
            const response = await axios.get(config.staticUrls.rarityTypeUrl);
            return res.json(response.data);
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        }
    }

    static async getRepresentId(req, res) {
        try {
            const response = await axios.get(config.staticUrls.repIdUrl);
            return res.json(response.data)
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        }
    }
}