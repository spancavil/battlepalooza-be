import { UserService } from '../services/index.js';
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

}

