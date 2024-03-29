import logger from "../logger/bunyan.js";
import axios from "axios";
import config from "../config/index.js";

export class DropController {

    static async getDrops(req, res) {
        try {
            const page = 1;
            const pageSize = 12;
            const response = await axios.post(config.bpEndpoints.getDropList, {
                page,
                pageSize
            })
            return res.json(response.data);
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        }
    }

    static async getDropDetail(req, res) {
        try {
            const { pid, dropId } = req.body;
            const response = await axios.post(config.bpEndpoints.getDropDetail, {
                pid: pid,
                dropId: dropId
            })
            return res.json(response.data);
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        }
    }
/* 
    static async payCoinNft(req, res) {
        try {
            const { pid, productId, bpToken, quantity } = req.body;
            const response = await axios.post(config.bpEndpoints.payCoinNft, {
                pid,
                productId,
                purchaseCnt: quantity || 1
            }, { headers: bpToken })
            return res.json(response.data);
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        }
    } */

    static async buyShopNft(req, res) {
        try {
            const { pid, productId, quantity, bpToken } = req.body;
            const response = await axios.post(config.bpEndpoints.buyShopNft, {
                pid,
                productId,
                purchaseCnt: quantity || 1
            }, { headers: bpToken })
            return res.json(response.data);
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        }
    }

    static async getTxStatus(req, res) {
        try {
            const { pid, forteTxId, bpToken } = req.body;
            const response = await axios.post(config.bpEndpoints.getForteTxStatus, {
                pid,
                forteTxId
            }, { headers: bpToken })
            return res.json(response.data);
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        }
    }
}