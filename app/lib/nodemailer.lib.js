import nodemailer from 'nodemailer';
import config from '../config/index.js';
const { USER, PASS, SERVICE } = config.nodemailer;
import logger from '../logger/bunyan.js';

class NodeMailerLib {
    static async sendEmail(options){
        try {

            const transporter = nodemailer.createTransport({
              service: SERVICE,
              auth: {
                user: USER,
                pass: PASS,
              },
            });
           await transporter.sendMail(options);
        } catch (error) {
          logger.error(`Error at nodemailer: ${error.name} Message: ${error.message} Status Code: ${error.status}`);
          throw { Error: error.name, Message: error.message}
        }
    }

    
}
export default NodeMailerLib; 