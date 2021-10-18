import { LoginService } from '../services/index.js';
import logger from "../logger/bunyan.js";
import AxiosService from '../lib/axios.lib.js';
import { UserModel } from '../models/user.model.js';

export class LoginController {
    static async firstLogin (req, res) {

        try {
            const data = await LoginService.firstLogin(req.body);
            return res.json({success: true, data})
            } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            return res.json({error: error.name, message: error.message});
        }
    }

    static async login (req,res){
        try {
            const data = await LoginService.login(req.body);
            return res.json({success: true, data})
            } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            return res.json({error: error.name, message: error.message});
        }
    }

    static async verifyCode (req,res,next){
        try {
            const email = req.body.email
            const user = await UserModel.findByEmail(email);
            console.log(user)
            if (!user) {
                return res.json({message: "User doesn't exist", success: false})
            }
            const response = await AxiosService.sendCode(email);
            if (response.success === true) {
                return res.json({ message: `Code sent!` });
            }
            else {
                return res.json({ message: "Please try again later", success: false})
            }

        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            res.send({success: false, message: error.message});
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
