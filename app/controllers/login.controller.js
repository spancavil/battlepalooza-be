import { LoginService } from '../services/index.js';
import logger from "../logger/bunyan.js";
import { CodeChallengeMethod } from 'google-auth-library';
import AxiosService from '../lib/axios.lib.js';
import { UserModel } from '../models/user.model.js';

export class LoginController {
    static async firstLogin (req, res, next) {

        try {
            const data = await LoginService.firstLogin(req.body);
            res.json({success: true, data})
            } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({error: error.name, message: error.message});
            next(error);
        }
    }

    static async login (req,res, next){
        try {
            const data = await LoginService.login(req.body);
            res.json({success: true, data})
            } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({error: error.name, message: error.message});
            next(error);
        }
    }

    static async verifyCode (req,res,next){
        try {
            const email = req.body.email
            const user = await UserModel.findByEmail(email);
            if (!user) {
                res.send ({error: "User doesn't exist"})
            }
            const response = await AxiosService.sendCode(email);
            if (response.success === true) {
                res.send({ message: `Code sent!` });
            }
            else {
                res.send({ error: "Please try again later"})
            }

        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({error: error.name, message: error.message});
            next(error);
        }
    }

    /* static async sentCodeByMail (req, res){
        try {
            const data = await LoginService.sentVerifyCode(req.body);
            res.json({success: true, data})
            } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({error: error.name, message: error.message});
        }
    } */
}
