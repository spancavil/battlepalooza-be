import { UserService } from '../services/index.js';
import logger from "../logger/bunyan.js";
import axios from 'axios';
import config from '../config/index.js';

export class UserController {

    static async verifyReCaptcha(req, res, next) {
        const { captchaToken } = req.body;
        try {
            const response = axios.post(`
                https://www.google.com/recaptcha/api/siteverify?secret=${config.recaptcha.secret}&response=${captchaToken}`)
                .then(response => {
                    res.json(response.data)
                })
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        }
    }

    static async payloadForte(req, res, next) {

        const { bpTokenHeader, pid } = req.body;
        try {
            const response = await axios.post(config.bpEndpoints.payloadForte, { pid }, { headers: bpTokenHeader });
            return res.json(response.data);
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        }
    }

    static async forteBalance(req, res) {
        const { bpTokenHeader, pid } = req.body;
        try {
            const response = await axios.post(config.bpEndpoints.forteBalance, { pid }, { headers: bpTokenHeader });
            return res.json(response.data);
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        }
    }

    static async getCollection(req, res) {
        const { bpTokenHeader, pid } = req.body;
        try {
            const response = await axios.post(config.bpEndpoints.getCollection, { pid }, { headers: bpTokenHeader });
            return res.json(response.data);
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        }
    }

    static async getCollectionDetail(req, res) {
        const { bpTokenHeader, pid, uuid } = req.body;
        try {
            const response = await axios.post(config.bpEndpoints.getCollectionDetail, { pid, uuid }, { headers: bpTokenHeader });
            return res.json(response.data);
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        }
    }

    static async getMarketHistory(req, res) {
        const { bpTokenHeader, pid, page = 1, pageSize = 10 } = req.body;
        const { historyTypes } = config;
        const data = { asSeller: null, asBuyer: null }
        for (const type of historyTypes) {
            try {
                const response = await axios.post(
                    config.bpEndpoints.tradeHistoryList,
                    { pid, page, pageSize, historyType: type },
                    { headers: bpTokenHeader });
                if (type === 1) {
                    data.asSeller = response.data;
                }
                if (type === 2) {
                    data.asBuyer = response.data;
                }
            } catch (error) {
                logger.info(`Error: ${error.name} ${error.message}`);
                logger.error(`Error: ${error.name} ${error.message}`);
                res.status(error.status || 500).json({ error: error.name, message: error.message });
            }
        }
        return res.json(data)
    }

    static async getMarketHistoryDetail(req, res) {
        const { bpTokenHeader, pid, listingId } = req.body;
        try {
            const response = await axios.post(
                config.bpEndpoints.tradeHistoryDetail,
                { pid, listingId },
                { headers: bpTokenHeader }
            );
            return res.json(response.data);
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        }
    }

    static async getWalletPaymentToken (req,res) {
        const { bpTokenHeader, email, pid, productId} = req.body;
        try {
            const response = await axios.post(
                config.bpEndpoints.getWalletPaymentToken,
                {pid, productId, email},
                {headers: bpTokenHeader}
            );
            return res.json(response.data);
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        }
    }

    static async getWalletCryptoTransactions (req,res) {
        const { bpTokenHeader, pid, limit = 10, page = 1} = req.body;
        try {
            const response = await axios.post(
                config.bpEndpoints.getWalletCryptoTransactions,
                {pid, limit, page},
                {headers: bpTokenHeader}
            );
            return res.json(response.data);
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        }
    }

    static async getMaintenanceStatus (req,res) {
        try {
            const response = await axios.post(
                config.bpEndpoints.getMaintenanceStatus,
            );
            return res.json(response.data);
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        }
    }
}
