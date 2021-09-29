import { UserModel } from '../models/index.js';
import logger from '../logger/bunyan.js';

export class UserService {

    static async createUser (data) {
        try {
            const user = awaitUserModel.createUser(data);
            return { message: `User created, thanks ${user.name} ${user.lastName}` };
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`)
            return {error: error.name, message: error.message};
        }
    }

    static async findUserById (id) {
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`)
            return {error: error.name, message: error.message};
        }
    }

    static async findAllUsers () {
        try {
            const users = await UserModel.findAll();
            return users;
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`)
            return {error: error.name, message: error.message};
        }
    }

    static async updateUserData (data, id) {   

        try {
            const user = await UserModel.updateUser(data, id);
                return user ;
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            return {error: error.name, message: error.message};
        }
    }

    static async deleteUser (id) {   

        try {
            const user = await CustomerModel.deleteById(id);
            return user;
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            return {error: error.name, message: error.message};
        }
    }
}
