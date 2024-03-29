import logger from "../logger/bunyan.js";
import config from '../config/index.js';
import axios from 'axios';

export class PackController {

    static async getPackNftInfo (req,res) {
        try {
            const response = await axios.post(
                config.bpEndpoints.getPackNftInfo,
            );
            return res.json(response.data);
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        }
    }

    static async getDateNow (req,res) {
        try {
            const actualTimeUTCmilliseconds = new Date().getTime()
            return res.json({unixtime: actualTimeUTCmilliseconds});
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        }
    }
}
