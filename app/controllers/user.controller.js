import { UserService } from '../services/index.js';
import logger from "../logger/bunyan.js";
import axios from 'axios';
import config from '../config/index.js';

export class UserController {
    static async userRegistration (req, res, next) {
     
        try {
            const data = await UserService.createUser(req.body);
            return res.json({success: true, data})
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`)
            return res.json({error: error.name, message: error.message});
        }
    }

    static async findOneUser (req, res, next) {

        const { id } = req.query;
        
        try {
            const data = await UserService.findUserById(id);
            res.json({success: true, data})
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`)
            res.status(error.status || 500).json({error: error.name, message: error.message});
            next(error);
        }
    }

    static async findAllUsers (req, res, next) {
        
        try {
            console.log("Entro a findAll !")
            const data = await UserService.findAllUsers();
            res.json({success: true, data})
        } catch (error) {
            logger.error(`Error en findAll de User Controller: ${error.name} ${error.message}`)
            res.status(error.status || 500).json({error: error.name, message: error.message});
            next(error);
        }
    }

    static async updateUser (req, res, next) {   

        const { id } = req.query;
        try {
            const data = await UserService.updateUserData(req.body, id)
                res.json({success: true, data})
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({error: error.name, message: error.message});
            next(error);
        }
    }

    static async deleteUser (req, res, next) {   

        const { id } = req.query;
        try {
            const data = await UserService.deleteUser(id)
                res.json({success: true, data})
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({error: error.name, message: error.message});
            next(error);
        }
    }

    static async verifyReCaptcha (req, res, next){
        const {captchaToken} = req.body;
        try {
            const response = axios.post(`
                https://www.google.com/recaptcha/api/siteverify?secret=${config.recaptcha.secret}&response=${captchaToken}`)
                .then(response => {
                    res.json(response.data)
                })
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({error: error.name, message: error.message});
        }
    }

    static async payloadForte (req, res, next){

        const {bpTokenHeader, pid} = req.body;
        try {
            const response = await axios.post(config.bpEndpoints.payloadForte,{pid}, {headers: bpTokenHeader});
            return res.json(response.data);
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({error: error.name, message: error.message});
        }
    }

    static async forteBalance (req,res){
        const {bpTokenHeader, pid} = req.body;
        try {
            const response = await axios.post(config.bpEndpoints.forteBalance ,{pid}, {headers: bpTokenHeader});
            return res.json(response.data);
        } catch (error) {
            console.log(error);
            logger.error(`Error: ${error.name} ${error.message}`);
            res.status(error.status || 500).json({error: error.name, message: error.message});
        }
    }
}
