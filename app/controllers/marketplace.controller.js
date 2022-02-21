import logger from "../logger/bunyan.js";
import axios from 'axios';
import config from '../config/index.js';
import { MarketService } from '../services/market.service.js';

export class MarketController {

    static async getMarketData (req, res){
        try {
            const response = await MarketService.getData()
            return res.json(response)
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({error: error.name, message: error.message});
        }
    }

    static async getMarketList (req, res){
        try {
            const {page, filter} = req.body;
            /* "filter": {
                "rarity": {
                  "type": 3
                },
                "repId": {
                  "type": 1,
                  "id": 12
                },
                "remainPlayCount": {
                  "min": 100,
                  "max": 0
                } */
            const response = await MarketService.getList(page, filter);
            return res.json(response);
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({error: error.name, message: error.message});
        }
    }

    static async getMarketDetail (req, res){
        try {
            const {seller, uniqueId} = req.body
            const response = await MarketService.getDetail(seller, uniqueId);
            return res.json(response);
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({error: error.name, message: error.message});
        }
    }

    static async registerProduct (req, res){
        try {
            const {pid, uuid, price, bpToken} = req.body
            const parsedPrice = parseInt(price);
            //console.log(pid, uuid, price, parsedPrice, parsedExpiry);
            const response = await axios.post(config.bpEndpoints.registerProductMarket, {
                pid,
                uuid,
                price: parsedPrice,
            }, {headers: bpToken})
            return res.json(response.data);
        } catch (error) {
            console.log(error)
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({error: error.name, message: error.message});
        }
    }

    static async buyProduct (req, res) {
        try {
            const {pid, seller, uniqueId, bpToken} = req.body
            const response = await axios.post(config.bpEndpoints.buyProductMarket, {
                pid,
                seller,
                uniqueId,
            }, {headers: bpToken})
            return res.json(response.data);
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({error: error.name, message: error.message});
        }
    }

    static async getTxStatus (req, res){
        try {
            const {pid, forteTxId, bpToken} = req.body;
            console.log(pid, forteTxId, bpToken);
            console.log(config.bpEndpoints.getForteTxStatus);
            const response = await axios.post(config.bpEndpoints.getForteTxStatus, {
                pid,
                forteTxId
            }, {headers: bpToken})
            return res.json(response.data);

        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({error: error.name, message: error.message});
        }
    }

    static async cancelSelling (req, res){
        try {
            const {pid, uniqueId, bpToken} = req.body;
            const response = await axios.post(config.bpEndpoints.cancelSellingMarket, {
                pid,
                uniqueId
            }, {headers: bpToken});
            return res.json(response.data);

        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({error: error.name, message: error.message});
        }
    }

    static async requestWithdraw (req, res) {
        try {
            const {pid, uniqueId, bpToken} = req.body;
            const response = await axios.post(config.bpEndpoints.requestWithdrawCoins, {
                pid,
                uniqueId
            }, {headers: bpToken});
            return res.json(response.data);

        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({error: error.name, message: error.message});
        }
    }
}

