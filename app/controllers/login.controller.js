import { LoginService } from '../services/index.js';
import logger from "../logger/bunyan.js";

export class LoginController {
    static async login (req, res, next) {

        try {
            const data = await LoginService.generalLogin(req.body);
            res.json({success: true, data})
            } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({error: error.name, message: error.message});
            next(error);
        }
    }

    static async sentCodeByMail (req, res){
        try {
            const data = await LoginService.sentVerifyCode(req.body);
            res.json({success: true, data})
            } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({error: error.name, message: error.message});
        }
    }
}
