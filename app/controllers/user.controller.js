import { UserService } from '../services/index';
import logger from "../logger/bunyan";

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
            const data = await UserService.findAllUsers();
            res.json({success: true, data})
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`)
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
}
