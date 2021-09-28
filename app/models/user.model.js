import { User } from '../schemas/user.schema.js';
import logger from "../logger/bunyan.js";

export class UserModel {

    static async createUser (data) {
        try {
            const user = await User.create(data);
            return user
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            return { error: error.name, message: error.message};
        }
    }

    static async findById (id) {
        try {
            const user = await User.findOne({_id: id});
            return user;
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            return { error: error.name, message: error.message};
        }
    }

    static async findByEmail (email) {
        try {
            const user = await User.findOne({email});
            return user;
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            return { error: error.name, message: error.message};
        }
    }

    static async updateUser (dataToUpdate, id) {
        try {
            const user = await User.findOneAndUpdate({_id: id},
                dataToUpdate, {
                    new: true
                }); 
            return user;
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            return { error: error.name, message: error.message};
        }
    }

    static async deleteById (id) {
        try {
            const user = await User.findOneAndDelete({_id: id});
            return user;
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            return { error: error.name, message: error.message};
        }
    }
}