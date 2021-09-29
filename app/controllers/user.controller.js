import { UserService } from '../services/index.js';
import logger from "../logger/bunyan.js";

export class UserController {
    static async userRegistration (req, res, next) {
     
        try {
            const data = await UserService.createUser(req.body);
            res.json({success: true, data})
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`)
            res.status(error.status || 500).json({error: error.name, message: error.message});
            next(error);
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
            //res.status(error.status || 500).json({error: error.name, message: error.message});
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
}
