import AxiosService from "../lib/axios.lib.js";
import logger from "../logger/bunyan.js";

export class MarketService {
    static async getData (){
        try {
            const response = await AxiosService.getMarketData()
            return response;
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            return {error: error.name, message: error.message};
        }
    }

    static async getList(page, filter){
        try {
            const response = await AxiosService.getMarketList()
            return response
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            return {error: error.name, message: error.message};
        }
    }

    static async getDetail(){
        try {
            const response = await AxiosService.getMarketDetail()
            return response;
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            return {error: error.name, message: error.message};
        }
    }
}