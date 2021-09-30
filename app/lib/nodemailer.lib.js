import nodemailer from 'nodemailer';
import config from '../config/index.js';
const { USER, PASS, SERVICE, CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN, REFRESH_TOKEN} = config.nodemailer;
import logger from '../logger/bunyan.js';

class NodeMailerLib {
    static async sendEmail(options){
        try {

            const transporter = nodemailer.createTransport({
              service: SERVICE,
              auth: {
                type: 'OAuth2',
                user: USER,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: ACCESS_TOKEN
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